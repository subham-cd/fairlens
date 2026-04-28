import { useState, useEffect } from 'react';
import { detectSensitive } from '../services/api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const AttributeSelector = ({ columns, onConfirm }) => {
  const [sensitiveColumns, setSensitiveColumns] = useState([]);
  const [outcomeColumn, setOutcomeColumn] = useState('');
  const [domain, setDomain] = useState('hiring');
  const [detected, setDetected] = useState([]);

  useEffect(() => {
    const autoDetect = async () => {
      const results = await detectSensitive(columns);
      const detectedCols = results.map(r => r.column);
      setDetected(detectedCols);
      setSensitiveColumns(detectedCols);
    };
    if (columns.length > 0) autoDetect();
  }, [columns]);

  const handleToggleSensitive = (col) => {
    setSensitiveColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const domains = [
    { id: 'hiring', label: 'Hiring & Recruitment' },
    { id: 'loan', label: 'Banking & Loans' },
    { id: 'healthcare', label: 'Healthcare Decisions' },
    { id: 'education', label: 'Education & Admissions' },
    { id: 'other', label: 'Other' }
  ];

  const isValid = sensitiveColumns.length > 0 && outcomeColumn !== '';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            1. Select Sensitive Attributes
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Identify columns that contain protected categories (e.g., Gender, Caste, Religion).
          </p>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
            {columns.map(col => (
              <label 
                key={col} 
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 
                  ${sensitiveColumns.includes(col) ? 'bg-primary-50 border-primary-500' : 'hover:bg-gray-50 border-gray-200'}`}
              >
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={sensitiveColumns.includes(col)}
                  onChange={() => handleToggleSensitive(col)}
                />
                <div className="flex items-center gap-2 w-full">
                  <div className={`h-4 w-4 rounded border flex items-center justify-center 
                    ${sensitiveColumns.includes(col) ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                    {sensitiveColumns.includes(col) && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium truncate">{col}</span>
                  {detected.includes(col) && (
                    <span className="ml-auto text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold uppercase">Detected</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">2. Select Outcome & Domain</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outcome Column (Target)</label>
                <select 
                  value={outcomeColumn} 
                  onChange={(e) => setOutcomeColumn(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select the target variable...</option>
                  {columns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500 italic">e.g. "selected", "approved", "admitted"</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Domain</label>
                <div className="grid grid-cols-2 gap-2">
                  {domains.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setDomain(d.id)}
                      className={`p-2 text-xs font-medium rounded-lg border transition-all 
                        ${domain === d.id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={!isValid}
            onClick={() => onConfirm({ sensitiveColumns, outcomeColumn, domain })}
            className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
          >
            Run Bias Analysis
            <AlertCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttributeSelector;
