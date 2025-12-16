import { Clock, TrendingDown, Trophy, AlertTriangle, Play, Calendar, Star, Target, Activity, Zap, Timer as TimerIcon, Award } from 'lucide-react';
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

  // Achievements
  const achievements = [
    { name: 'Early Bird', desc: 'Bermain sebelum jam 8 pagi', unlocked: true, icon: '🌅' },
    { name: 'Balanced Gamer', desc: 'Konsisten dalam batas 7 hari', unlocked: true, icon: '⚖️' },
    { name: 'Quick Player', desc: 'Main kurang dari 1 jam/hari selama 5 hari', unlocked: false, icon: '⚡' },
    { name: 'Week Master', desc: 'Selesaikan minggu tanpa melebihi batas', unlocked: false, icon: '👑' },
  ];

  const todayPercentage = (todayMinutes / dailyLimit) * 100;
  const weeklyPercentage = (weeklyTotal / weeklyLimit) * 100;
  const comparison = todayMinutes - yesterdayMinutes;

  const getStatusColor = (percentage: number) => {
    if (theme === 'dark') {
      if (percentage < 50) return 'text-green-400';
      if (percentage < 80) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (percentage < 50) return 'text-green-600';
      if (percentage < 80) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDayColor = (minutes: number) => {
    const percentage = (minutes / (dailyLimit)) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section with Quick Action */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/10'
          : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className={theme === 'dark' ? 'text-white mb-2' : 'text-gray-900 mb-2'}>Selamat Datang! 👋</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-purple-200' : 'text-purple-700'}`}>
              Pantau dan kelola waktu gaming Anda dengan bijak
            </p>
          </div>
        </div>
        <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
          <Play className="w-5 h-5" />
          <span>Mulai Sesi Gaming</span>
        </button>
      </div>

      {/* Today's Usage */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <Clock className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Hari Ini</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Waktu bermain</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl ${getStatusColor(todayPercentage)}`}>
              {todayMinutes}m
            </span>
            <div className="flex items-center gap-1 justify-end mt-1">
              {comparison < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs">{Math.abs(comparison)}m lebih baik</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs">{comparison}m lebih lama</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Batas: {dailyLimit}m
            </span>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              {dailyLimit - todayMinutes}m tersisa
            </span>
          </div>
          <div className={`w-full rounded-full h-3 overflow-hidden ${
            theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200'
          }`}>
            <div
              className={`h-full ${getProgressBarColor(todayPercentage)} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(todayPercentage, 100)}%` }}
            />
          </div>
        </div>
        {todayPercentage > 80 && (
          <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
            theme === 'dark'
              ? 'bg-red-500/10 border border-red-500/30'
              : 'bg-red-50 border border-red-200'
          }`}>
            <AlertTriangle className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
            <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
              Anda hampir mencapai batas waktu harian! Pertimbangkan untuk istirahat.
            </p>
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Activity className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            Sesi Terakhir
          </h3>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Hari ini
          </span>
        </div>
        <div className="space-y-3">
          {recentGames.map((game, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700/30 hover:bg-slate-700/50'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{game.icon}</span>
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {game.name}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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

      {/* Weekly Calendar Heatmap */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Kalender Mingguan</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className={`text-xs ${
                day.isToday 
                  ? theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {day.day}
              </span>
              <div
                className={`w-full aspect-square rounded-lg ${getDayColor(day.minutes)} ${
                  day.isToday ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900' : ''
                }`}
                title={`${day.minutes} menit`}
              />
              <span className={`text-[10px] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                {day.minutes}m
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Sehat</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500"></div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Sedang</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500"></div>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Tinggi</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak Card */}
        <div className={`border rounded-xl p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
        }`}>
          <div className="flex flex-col items-center text-center">
            <Trophy className={`w-8 h-8 mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <span className={`text-2xl mb-1 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
              {streak} hari
            </span>
            <span className={`text-xs ${theme === 'dark' ? 'text-yellow-200/70' : 'text-yellow-700'}`}>
              Dalam Batas
            </span>
          </div>
        </div>

        {/* Health Status */}
        <div className={`border rounded-xl p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30'
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
        }`}>
          <div className="flex flex-col items-center text-center">
            <Zap className={`w-8 h-8 mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-2xl mb-1 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
              Sehat
            </span>
            <span className={`text-xs ${theme === 'dark' ? 'text-green-200/70' : 'text-green-700'}`}>
              Status Gaming
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <Target className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Minggu Ini</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total waktu bermain
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl ${getStatusColor(weeklyPercentage)}`}>
              {Math.floor(weeklyTotal / 60)}h {weeklyTotal % 60}m
            </span>
            <div className="flex items-center gap-1 justify-end mt-1">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                dari {Math.floor(weeklyLimit / 60)}h
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Batas: {Math.floor(weeklyLimit / 60)}h
            </span>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              {Math.floor((weeklyLimit - weeklyTotal) / 60)}h tersisa
            </span>
          </div>
          <div className={`w-full rounded-full h-3 overflow-hidden ${
            theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-200'
          }`}>
            <div
              className={`h-full ${getProgressBarColor(weeklyPercentage)} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Award className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            Pencapaian
          </h3>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            2/4 terbuka
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all ${
                achievement.unlocked
                  ? theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30'
                    : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300'
                  : theme === 'dark'
                    ? 'bg-slate-700/30 border-slate-600/30 opacity-50'
                    : 'bg-gray-50 border-gray-300 opacity-50'
              }`}
            >
              <div className="text-center">
                <span className="text-3xl mb-2 block">{achievement.icon}</span>
                <p className={`text-xs mb-1 ${
                  achievement.unlocked
                    ? theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                    : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {achievement.name}
                </p>
                <p className={`text-[10px] ${
                  achievement.unlocked
                    ? theme === 'dark' ? 'text-purple-200/70' : 'text-purple-600'
                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {achievement.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
          : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
      }`}>
        <h3 className={`mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
          💡 Tips Hari Ini
        </h3>
        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>
          Ingat untuk melakukan peregangan setiap 30 menit! Istirahatkan mata Anda dengan melihat objek jauh selama 20 detik.
        </p>
      </div>
    </div>
  );
}