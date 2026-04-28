import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAudit } from '../hooks/useAudit';
import { ChevronLeft, Info, Calendar, FileSpreadsheet, Briefcase } from 'lucide-react';
import BiasScoreCard from '../components/BiasScoreCard';
import MetricsChart from '../components/MetricsChart';
import BiasExplanation from '../components/BiasExplanation';
import FixSuggestions from '../components/FixSuggestions';
import DownloadReport from '../components/DownloadReport';
import { formatDate } from '../utils/formatReport';

const Dashboard = () => {
  const { auditId } = useParams();
  const { fetchReport, loading, error } = useAudit();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchReport(auditId);
      setReport(data);
    };
    load();
  }, [auditId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Audit Results...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Report</h2>
        <p className="text-gray-600 mb-8">{error || 'Report not found'}</p>
        <Link to="/history" className="btn-primary">Back to History</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <Link to="/history" className="text-primary-600 flex items-center gap-1 text-sm font-medium mb-2 hover:underline">
            <ChevronLeft className="h-4 w-4" /> Back to History
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            Bias Audit: {report.dataset_name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-2">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(report.timestamp)}</span>
            <span className="flex items-center gap-1.5 uppercase font-bold text-xs bg-gray-100 px-2 py-0.5 rounded"><Briefcase className="h-3.5 w-3.5" /> {report.domain}</span>
            <span className="flex items-center gap-1.5"><FileSpreadsheet className="h-4 w-4" /> {report.dataset_summary?.total_rows || 0} Rows</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {report.is_ai_generated ? (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">AI LIVE</span>
          ) : (
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">DEMO FALLBACK</span>
          )}
          <DownloadReport auditId={auditId} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5 h-full">
          <BiasScoreCard score={report.overall_bias_score} severity={report.severity} summary={report.summary} />
        </div>
        <div className="lg:col-span-7 h-full">
          <MetricsChart affectedGroups={report.affected_groups} />
        </div>
        <div className="lg:col-span-7 space-y-8">
          <FixSuggestions fixes={report.fixes} />
        </div>
        <div className="lg:col-span-5">
          <BiasExplanation rootCause={report.root_cause} regulationRisk={report.india_regulation_risk} complianceStatus={report.compliance_status} />
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-4">
        <div className="bg-white p-2 rounded-lg border border-gray-200">
          <Info className="h-6 w-6 text-gray-400" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Audit Trail & Methodology</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {report.audit_trail_note} This analysis used Fairlearn metrics computed for {report.sensitive_columns.join(', ')} attributes relative to the "{report.outcome_column}" outcome. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
