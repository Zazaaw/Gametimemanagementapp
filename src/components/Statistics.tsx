import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, TrendingUp, Calendar, Gamepad2 } from 'lucide-react';
import { useTheme } from '../utils/theme';

export function Statistics() {
  const { theme } = useTheme();
  
  // Weekly data
  const weeklyData = [
    { day: 'Sen', minutes: 75, label: 'Senin' },
    { day: 'Sel', minutes: 120, label: 'Selasa' },
    { day: 'Rab', minutes: 45, label: 'Rabu' },
    { day: 'Kam', minutes: 30, label: 'Kamis' },
    { day: 'Jum', minutes: 60, label: 'Jumat' },
    { day: 'Sab', minutes: 90, label: 'Sabtu' },
    { day: 'Min', minutes: 105, label: 'Minggu' },
  ];

  // Game distribution data
  const gameData = [
    { name: 'Mobile Legends', value: 180, color: '#a855f7' },
    { name: 'PUBG Mobile', value: 120, color: '#f97316' },
    { name: 'Genshin Impact', value: 90, color: '#3b82f6' },
    { name: 'Free Fire', value: 60, color: '#eab308' },
    { name: 'Lainnya', value: 45, color: '#10b981' },
  ];

  const totalMinutes = gameData.reduce((acc, curr) => acc + curr.value, 0);
  const avgDaily = weeklyData.reduce((acc, curr) => acc + curr.minutes, 0) / 7;
  const trend = weeklyData[6].minutes < weeklyData[0].minutes ? 'down' : 'up';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`border rounded-lg p-3 shadow-xl ${
          theme === 'dark'
            ? 'bg-slate-800 border-white/20'
            : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {payload[0].payload.label}
          </p>
          <p className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
            {payload[0].value} menit
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/10'
          : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'
      }`}>
        <h2 className={theme === 'dark' ? 'text-white mb-2' : 'text-gray-900 mb-2'}>
          Statistik 📊
        </h2>
        <p className={theme === 'dark' ? 'text-purple-200 text-sm' : 'text-purple-700 text-sm'}>
          Analisis pola bermain game Anda
        </p>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`border rounded-xl p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30'
            : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
              Rata-rata/Hari
            </span>
          </div>
          <p className={`text-3xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {Math.round(avgDaily)}m
          </p>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-purple-200/60' : 'text-purple-600'}`}>
            Minggu ini
          </p>
        </div>

        <div className={`border rounded-xl p-5 ${
          trend === 'down'
            ? theme === 'dark'
              ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30'
              : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : theme === 'dark'
              ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {trend === 'down' ? (
              <>
                <TrendingDown className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  Tren
                </span>
              </>
            ) : (
              <>
                <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                <span className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  Tren
                </span>
              </>
            )}
          </div>
          <p className={`text-3xl ${
            trend === 'down'
              ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
              : theme === 'dark' ? 'text-red-400' : 'text-red-600'
          }`}>
            {trend === 'down' ? '↓' : '↑'}
          </p>
          <p className={`text-xs mt-1 ${
            trend === 'down'
              ? theme === 'dark' ? 'text-green-200/60' : 'text-green-700'
              : theme === 'dark' ? 'text-red-200/60' : 'text-red-700'
          }`}>
            {trend === 'down' ? 'Membaik' : 'Meningkat'}
          </p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Aktivitas Mingguan
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 
            />
            <XAxis 
              dataKey="day" 
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="minutes" 
              fill="url(#colorGradient)" 
              radius={[8, 8, 0, 0]} 
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Game Distribution */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Gamepad2 className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
            Distribusi Game
          </h3>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={gameData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {gameData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {gameData.map((game, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: game.color }}
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {game.name}
                </span>
              </div>
              <div className="text-right">
                <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {game.value}m
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  {((game.value / totalMinutes) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className={`border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
          : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
      }`}>
        <h3 className={`mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
          📈 Ringkasan Minggu Ini
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className={`text-sm ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>
              Total waktu bermain:
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
              {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
            </span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>
              Hari paling aktif:
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Selasa (120m)
            </span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>
              Game favorit:
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Mobile Legends
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}