import { Clock, TrendingDown, Trophy, AlertTriangle, Play, Calendar, Star, Target, Activity, Zap, Timer as TimerIcon, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../utils/theme';

export function Dashboard() {
  const { theme } = useTheme();
  const todayMinutes = 45;
  const dailyLimit = 120;
  const weeklyTotal = 315;
  const weeklyLimit = 840;
  const streak = 5;
  const yesterdayMinutes = 60;

  // Recent games data
  const recentGames = [
    { name: 'Mobile Legends', duration: 25, time: '10:30', icon: '🎮', color: 'purple' },
    { name: 'PUBG Mobile', duration: 20, time: '14:15', icon: '🔫', color: 'orange' },
  ];

  // Weekly calendar data
  const weekDays = [
    { day: 'Sen', minutes: 75, isToday: false },
    { day: 'Sel', minutes: 120, isToday: false },
    { day: 'Rab', minutes: 45, isToday: false },
    { day: 'Kam', minutes: 30, isToday: false },
    { day: 'Jum', minutes: 60, isToday: false },
    { day: 'Sab', minutes: 90, isToday: false },
    { day: 'Min', minutes: 45, isToday: true },
  ];

  const todayPercentage = (todayMinutes / dailyLimit) * 100;
  const weeklyPercentage = (weeklyTotal / weeklyLimit) * 100;
  const comparison = todayMinutes - yesterdayMinutes;

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600';
    if (percentage < 80) return theme === 'dark' ? 'text-amber-400' : 'text-amber-600';
    return theme === 'dark' ? 'text-rose-400' : 'text-rose-600';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 50) return 'from-emerald-500 to-green-500';
    if (percentage < 80) return 'from-amber-500 to-yellow-500';
    return 'from-rose-500 to-red-500';
  };

  const getDayColor = (minutes: number) => {
    const percentage = (minutes / dailyLimit) * 100;
    if (percentage < 50) return theme === 'dark' ? 'bg-emerald-500/80' : 'bg-emerald-500';
    if (percentage < 80) return theme === 'dark' ? 'bg-amber-500/80' : 'bg-amber-500';
    return theme === 'dark' ? 'bg-rose-500/80' : 'bg-rose-500';
  };

  return (
    <div className="p-6 space-y-5 pb-24">
      {/* Hero Section - Minimalist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Dashboard
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Pantau aktivitas gaming Anda
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg ${
            theme === 'dark' ? 'shadow-purple-500/20' : 'shadow-purple-500/30'
          }`}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Main Stats - Clean Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Today's Usage - Minimalist */}
        <div className={`border rounded-2xl p-5 ${
          theme === 'dark'
            ? 'bg-slate-800/30 border-slate-700/50 backdrop-blur-sm'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                todayPercentage < 50 ? 'bg-emerald-500' : todayPercentage < 80 ? 'bg-amber-500' : 'bg-rose-500'
              }`}></div>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Hari Ini
              </span>
            </div>
            <div>
              <p className={`text-3xl mb-1 ${getStatusColor(todayPercentage)}`}>
                {todayMinutes}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                dari {dailyLimit} menit
              </p>
            </div>
            {comparison < 0 && (
              <div className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] text-emerald-500">
                  {Math.abs(comparison)}m lebih baik
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Streak - Minimalist */}
        <div className={`border rounded-2xl p-5 ${
          theme === 'dark'
            ? 'bg-slate-800/30 border-slate-700/50 backdrop-blur-sm'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Streak
              </span>
            </div>
            <div>
              <p className={`text-3xl mb-1 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                {streak}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                hari berturut
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] text-amber-500">
                Tetap jaga!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar - Clean */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-slate-800/30 border-slate-700/50 backdrop-blur-sm'
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Progress Harian
          </span>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {Math.round(todayPercentage)}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'
        }`}>
          <div
            className={`h-full bg-gradient-to-r ${getProgressBarColor(todayPercentage)} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(todayPercentage, 100)}%` }}
          />
        </div>
        <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
          {dailyLimit - todayMinutes} menit tersisa
        </p>
      </div>

      {/* Quick Action - Minimalist Button */}
      <button className={`w-full border rounded-2xl p-5 transition-all group ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-600/90 to-blue-600/90 border-purple-500/30 hover:from-purple-600 hover:to-blue-600'
          : 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-700 hover:shadow-lg'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white">Mulai Sesi Gaming</p>
              <p className="text-xs text-white/70">Tracking otomatis</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* Weekly Calendar - Minimalist Heatmap */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-slate-800/30 border-slate-700/50 backdrop-blur-sm'
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Aktivitas Minggu Ini
          </h3>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {Math.floor(weeklyTotal / 60)}h {weeklyTotal % 60}m
          </span>
        </div>
        <div className="flex justify-between gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-full aspect-square rounded-lg transition-all ${getDayColor(day.minutes)} ${
                  day.isToday 
                    ? `ring-2 ${theme === 'dark' ? 'ring-purple-400' : 'ring-purple-600'} scale-105` 
                    : 'hover:scale-105'
                }`}
                title={`${day.minutes} menit`}
              />
              <span className={`text-[10px] ${
                day.isToday 
                  ? theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions - Clean List */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-slate-800/30 border-slate-700/50 backdrop-blur-sm'
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Sesi Terakhir
          </h3>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Hari ini
          </span>
        </div>
        <div className="space-y-2">
          {recentGames.map((game, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700/30 hover:bg-slate-700/50'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-slate-600/50' : 'bg-white'
                }`}>
                  <span className="text-xl">{game.icon}</span>
                </div>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {game.name}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {game.time}
                  </p>
                </div>
              </div>
              <span className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                {game.duration}m
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Stats - Minimalist */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-slate-800/30 border-slate-700/50 backdrop-blur-sm'
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Progress Mingguan
          </span>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {Math.round(weeklyPercentage)}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'
        }`}>
          <div
            className={`h-full bg-gradient-to-r ${getProgressBarColor(weeklyPercentage)} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className={`text-[10px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {Math.floor(weeklyTotal / 60)}h {weeklyTotal % 60}m dari {Math.floor(weeklyLimit / 60)}h
          </p>
          <p className={`text-[10px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {Math.floor((weeklyLimit - weeklyTotal) / 60)}h tersisa
          </p>
        </div>
      </div>

      {/* Status Card - Clean */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`border rounded-xl p-4 text-center ${
          theme === 'dark'
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-emerald-50 border-emerald-200'
        }`}>
          <Zap className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <p className={`text-xs ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
            Sehat
          </p>
        </div>

        <div className={`border rounded-xl p-4 text-center ${
          theme === 'dark'
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-amber-50 border-amber-200'
        }`}>
          <Trophy className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
          <p className={`text-xs ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>
            {streak} Hari
          </p>
        </div>

        <div className={`border rounded-xl p-4 text-center ${
          theme === 'dark'
            ? 'bg-blue-500/10 border-blue-500/30'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <Target className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            On Track
          </p>
        </div>
      </div>

      {/* Tips - Minimalist */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20'
          : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
          }`}>
            <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <div>
            <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Tips Hari Ini
            </p>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-indigo-200/70' : 'text-indigo-600'}`}>
              Istirahatkan mata setiap 20 menit dengan melihat objek jauh selama 20 detik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
