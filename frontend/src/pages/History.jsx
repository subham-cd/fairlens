import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAudit } from '../hooks/useAudit';
import { FileSearch, Calendar, ChevronRight, AlertCircle } from 'lucide-react';
import { formatDate } from '../utils/formatReport';
import { getSeverityColor } from '../utils/biasColors';

const History = () => {
  const { fetchHistory, loading, error } = useAudit();
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHistory();
        setAudits(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Loading Audit History...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Audit History</h1>
          <p className="text-gray-600">Track and manage your past AI bias detections.</p>
        </div>
        <Link to="/upload" className="btn-primary">New Audit</Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <span>Failed to load history: {error}</span>
        </div>
      )}

      {audits.length === 0 ? (
        <div className="card text-center py-20 bg-gray-50 border-dashed">
          <FileSearch className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Audits Found</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            You haven't run any bias audits yet. Upload a dataset to get started.
          </p>
          <Link to="/upload" className="btn-primary">Run First Audit</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bias Score</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {audits.map((audit) => (
                  <tr key={audit.audit_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{audit.dataset_name}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-tight font-semibold mt-1">{audit.domain}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="h-4 w-4" /> {formatDate(audit.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${audit.overall_bias_score > 60 ? 'bg-red-500' : audit.overall_bias_score > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${audit.overall_bias_score}%` }}
                          />
                        </div>
                        <span className="font-bold text-gray-900">{audit.overall_bias_score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-widest ${getSeverityColor(audit.severity)}`}>
                        {audit.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/dashboard/${audit.audit_id}`} 
                        className="text-primary-600 hover:text-primary-800 font-bold text-sm inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        View Report <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
