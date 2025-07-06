
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Sep', math: 78, english: 82, science: 85, history: 79 },
  { month: 'Oct', math: 82, english: 80, science: 88, history: 81 },
  { month: 'Nov', math: 85, english: 78, science: 90, history: 83 },
  { month: 'Dec', math: 88, english: 76, science: 92, history: 85 },
  { month: 'Jan', math: 90, english: 78, science: 94, history: 87 }
];

const PerformanceChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[60, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="english" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="science" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="history" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
