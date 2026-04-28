export const getScoreColor = (score) => {
  if (score <= 30) return '#16A34A'; // Green
  if (score <= 60) return '#CA8A04'; // Yellow
  if (score <= 80) return '#EA580C'; // Orange
  return '#DC2626'; // Red
};

export const getSeverityColor = (severity) => {
  const colors = {
    'LOW': 'bg-green-100 text-green-800',
    'MEDIUM': 'bg-yellow-100 text-yellow-800',
    'HIGH': 'bg-orange-100 text-orange-800',
    'CRITICAL': 'bg-red-100 text-red-800',
  };
  return colors[severity] || 'bg-gray-100 text-gray-800';
};

export const getFixTypeColor = (type) => {
  const colors = {
    'DATA': 'bg-blue-100 text-blue-800',
    'MODEL': 'bg-purple-100 text-purple-800',
    'PROCESS': 'bg-emerald-100 text-emerald-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};
