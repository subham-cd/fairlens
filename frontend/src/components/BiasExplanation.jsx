import { Brain, Gavel, CheckCircle } from 'lucide-react';

const BiasExplanation = ({ rootCause, regulationRisk, complianceStatus }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLIANT': return 'bg-green-100 text-green-800 border-green-200';
      case 'AT_RISK': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'NON_COMPLIANT': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">Root Cause Analysis</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">
          {rootCause}
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gavel className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900">India Regulation Risk</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(complianceStatus)}`}>
            {complianceStatus}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed">
          {regulationRisk}
        </p>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2 border border-blue-100">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <p className="text-xs text-blue-700">
            This analysis is aligned with India AI Governance Guidelines 2025 and the proposed Digital India Act.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiasExplanation;
