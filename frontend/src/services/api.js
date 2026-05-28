import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

const getAuthHeader = async (auth) => {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

export const analyzeDataset = async (file, domain, sensitiveColumns, outcomeColumn, auth) => {
  const headers = await getAuthHeader(auth);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('domain', domain);
  formData.append('sensitive_columns', JSON.stringify(sensitiveColumns));
  formData.append('outcome_column', outcomeColumn);

  // Removing the leading slash to make it relative to the baseURL
  const response = await api.post('analyze', formData, {
    headers: { ...headers, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getReport = async (auditId, auth) => {
  const headers = await getAuthHeader(auth);
  const response = await api.get(`report/${auditId}`, { headers });
  return response.data;
};

export const downloadPDF = async (auditId, auth) => {
  const headers = await getAuthHeader(auth);
  const response = await api.get(`report/${auditId}/pdf`, {
    headers,
    responseType: 'blob',
  });
  return response.data;
};

export const getHistory = async (auth) => {
  const headers = await getAuthHeader(auth);
  const response = await api.get('history', { headers });
  return response.data;
};

export const detectSensitive = async (columns) => {
  const response = await api.get('analyze/detect-sensitive', {
    params: { columns: columns.join(',') }
  });
  return response.data;
};

export default api;
