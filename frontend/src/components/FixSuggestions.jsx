import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Code, Lightbulb } from 'lucide-react';
import { getFixTypeColor } from '../utils/biasColors';

const FixSuggestions = ({ fixes }) => {
  const [expanded, setExpanded] = useState(0);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 px-2">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        Recommended Fixes
      </h3>
      
      <div className="space-y-3">
        {fixes.map((fix, index) => (
          <div key={index} className={`card p-0 overflow-hidden transition-all duration-300 ${expanded === index ? 'ring-2 ring-primary-500' : ''}`}>
            <button 
              onClick={() => setExpanded(expanded === index ? -1 : index)}
              className="w-full text-left p-5 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold 
                  ${fix.priority === 1 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  P{fix.priority}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getFixTypeColor(fix.fix_type)}`}>
                      {fix.fix_type}
                    </span>
                    <h4 className="font-bold text-gray-900">{fix.title}</h4>
                  </div>
                </div>
              </div>
              {expanded === index ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expanded === index && (
              <div className="px-5 pb-5 animate-in slide-in-from-top-2">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600 mb-4">{fix.description}</p>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-2 uppercase tracking-widest">
                      <Code className="h-3 w-3" /> Technical Implementation
                    </div>
                    <code className="text-primary-400 font-mono text-sm block leading-relaxed">
                      {fix.technical_detail}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixSuggestions;
