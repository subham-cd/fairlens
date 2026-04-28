import { useEffect, useState } from 'react';
import { getScoreColor, getSeverityColor } from '../utils/biasColors';

const BiasScoreCard = ({ score, severity, summary }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayScore(prev => {
        if (prev < score) return prev + 1;
        clearInterval(timer);
        return score;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="card text-center flex flex-col items-center justify-center h-full">
      <h3 className="text-gray-500 font-semibold uppercase text-sm tracking-wider mb-6">Overall Bias Score</h3>
      
      <div className="relative h-48 w-48 mb-6">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" stroke="#f3f4f6" strokeWidth="8" 
          />
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke={getScoreColor(score)} 
            strokeWidth="8" 
            strokeDasharray={`${displayScore * 2.83} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold" style={{ color: getScoreColor(score) }}>{displayScore}</span>
          <span className="text-xs text-gray-400 font-medium mt-1">out of 100</span>
        </div>
      </div>

      <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-4 ${getSeverityColor(severity)}`}>
        {severity} RISK
      </div>

      <p className="text-gray-600 leading-relaxed max-w-sm">
        {summary}
      </p>
    </div>
  );
};

export default BiasScoreCard;
