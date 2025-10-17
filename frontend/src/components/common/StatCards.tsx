import {
  Bar,
  BarChart,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#4F46E5", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#F97316", "#14B8A6", "#22D3EE", "#A3E635", "#EAB308"];
interface RadarChartCardProps {
  title: string;
  total: number;
  data: { name: string; value: number }[];
  height?: number;
  description?: string;
}

export const RadarChartCard: React.FC<RadarChartCardProps> = ({ title, total, data, height = 260, description }) => (
  <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      </div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">{total}</div>
    </div>
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#E5E7EB" strokeWidth={0.5} strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="name"
          tick={{
            fill: "#4B5563",
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "system-ui",
          }}
        />
        <PolarRadiusAxis
          stroke="#9CA3AF"
          tick={{
            fill: "#6B7280",
            fontSize: 10,
          }}
          tickLine={false}
          axisLine={false}
        />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="#4F46E5"
          fill="url(#radarGradient)"
          fillOpacity={0.6}
          strokeWidth={2}
          dot={{
            r: 4,
            fill: "#4F46E5",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-indigo-600 font-bold">{payload[0].value}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
    <div className="flex flex-wrap gap-2 mt-4">
      {data.slice(0, 4).map((item, index) => (
        <div key={item.name} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
          <span className="text-xs text-gray-600 font-medium">{item.name}</span>
        </div>
      ))}
      {data.length > 4 && <span className="text-xs text-gray-400 font-medium">+{data.length - 4} more</span>}
    </div>
  </div>
);

interface BarChartCardProps {
  title: string;
  total: number;
  data: { name: string; value: number }[];
  height?: number;
  description?: string;
  showTrend?: boolean;
  trendValue?: number;
}

export const BarChartCard: React.FC<BarChartCardProps> = ({ title, total, data, height = 200, description, showTrend = false, trendValue = 0 }) => {
  const getTrendColor = (value: number) => {
    if (value > 0) return "text-green-600 bg-green-50";
    if (value < 0) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const getTrendIcon = (value: number) => {
    if (value > 0) return "↗";
    if (value < 0) return "↘";
    return "→";
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 mb-1">{total}</div>
          {showTrend && (
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getTrendColor(trendValue)}`}>
              <span>{getTrendIcon(trendValue)}</span>
              <span>{Math.abs(trendValue)}%</span>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} barCategoryGap="25%" barGap={6} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <XAxis dataKey="name" fontSize={11} fontWeight={500} tick={{ fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis fontSize={11} tick={{ fill: "#6B7280" }} axisLine={false} tickLine={false} width={35} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[120px]">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                    <p className="text-indigo-600 font-bold text-lg">{payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" barSize={24} radius={[6, 6, 0, 0]} className="transition-all duration-300 hover:opacity-80">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{
                  filter: `drop-shadow(0 2px 4px ${COLORS[index % COLORS.length]}40)`,
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
