
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import type { Report } from '../types';
import { ReportCategory, ReportStatus } from '../types';

interface AnalyticsDashboardProps {
  reports: Report[];
}

const COLORS = {
  [ReportStatus.Submitted]: '#FBBF24', // Amber 400
  [ReportStatus.InProgress]: '#3B82F6', // Blue 500
  [ReportStatus.Resolved]: '#10B981',   // Emerald 500
};

const CATEGORY_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Issues`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ reports }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const analyticsData = useMemo(() => {
    const totalReports = reports.length;
    const resolvedReports = reports.filter(r => r.status === ReportStatus.Resolved).length;
    const inProgressReports = reports.filter(r => r.status === ReportStatus.InProgress).length;
    const submittedReports = reports.filter(r => r.status === ReportStatus.Submitted).length;

    const reportsByCategory = Object.values(ReportCategory).map(category => ({
      name: category,
      count: reports.filter(r => r.category === category).length,
    })).filter(c => c.count > 0);

    const reportsByStatus = [
      { name: ReportStatus.Submitted, value: submittedReports },
      { name: ReportStatus.InProgress, value: inProgressReports },
      { name: ReportStatus.Resolved, value: resolvedReports },
    ].filter(s => s.value > 0);
    
    return { totalReports, resolvedReports, inProgressReports, submittedReports, reportsByCategory, reportsByStatus };
  }, [reports]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-500">Total Reports</h3>
            <p className="mt-2 text-4xl font-bold text-gray-900">{analyticsData.totalReports}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-500">In Progress</h3>
            <p className="mt-2 text-4xl font-bold text-blue-600">{analyticsData.inProgressReports}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-500">Resolved</h3>
            <p className="mt-2 text-4xl font-bold text-green-600">{analyticsData.resolvedReports}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Reports by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.reportsByCategory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3B82F6" name="Number of Reports"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Reports by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie 
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={analyticsData.reportsByStatus} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60}
                        outerRadius={80} 
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {analyticsData.reportsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as ReportStatus]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
