import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { getScoreColor } from '../utils/biasColors';

const MetricsChart = ({ affectedGroups }) => {
  // Prep data for Recharts
  const data = affectedGroups.map(group => ({
    name: group.group.split(':').pop(),
    fullName: group.group,
    value: group.metric_value,
    finding: group.plain_finding
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-xl rounded-lg max-w-[250px]">
          <p className="font-bold text-gray-900 mb-1">{payload[0].payload.fullName}</p>
          <p className="text-sm text-gray-600">{payload[0].payload.finding}</p>
          <p className="mt-2 font-mono font-bold text-primary-600">Metric: {(payload[0].value * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-500 font-semibold uppercase text-sm tracking-wider">Group Bias Metrics</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1"><div className="h-3 w-3 bg-red-500 rounded-sm" /> Biased</div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 bg-green-500 rounded-sm" /> Fair</div>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
            <XAxis type="number" domain={[0, 1]} tickFormatter={(val) => `${val * 100}%`} />
            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0.8} stroke="#9ca3af" strokeDasharray="5 5" label={{ position: 'top', value: '80% Fairness Rule', fontSize: 10, fill: '#6b7280' }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value < 0.8 ? '#ef4444' : '#10b981'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p className="mt-4 text-xs text-gray-400 italic text-center">
        * Bars below 80% indicate significant disparate impact against that group.
      </p>
    </div>
  );
};

export default MetricsChart;
