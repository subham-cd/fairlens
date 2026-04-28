import { FileDown, CheckCircle2 } from 'lucide-react';
import { useAudit } from '../hooks/useAudit';
import { useState } from 'react';

const DownloadReport = ({ auditId }) => {
  const { exportPDF } = useAudit();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await exportPDF(auditId);
    setDownloading(false);
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={downloading}
      className="btn-secondary flex items-center gap-2 shadow-sm"
    >
      {downloading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" />
      ) : (
        <FileDown className="h-4 w-4" />
      )}
      {downloading ? 'Generating PDF...' : 'Export Audit Report'}
    </button>
  );
};

export default DownloadReport;
