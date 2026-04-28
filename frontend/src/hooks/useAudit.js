import { useState } from 'react';
import { analyzeDataset, getReport, downloadPDF, getHistory } from '../services/api';
import { auth } from '../services/firebase';

export const useAudit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAnalysis = async (file, domain, sensitiveColumns, outcomeColumn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeDataset(file, domain, sensitiveColumns, outcomeColumn, auth);
      return result;
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchReport = async (auditId) => {
    setLoading(true);
    try {
      return await getReport(auditId, auth);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async (auditId) => {
    try {
      const blob = await downloadPDF(auditId, auth);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `FairLens_Audit_${auditId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download PDF');
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      return await getHistory(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, runAnalysis, fetchReport, exportPDF, fetchHistory };
};
