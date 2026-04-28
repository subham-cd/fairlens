export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatMetricValue = (value) => {
  return (value * 100).toFixed(1) + '%';
};
