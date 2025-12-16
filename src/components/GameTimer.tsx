import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Gamepad2 } from 'lucide-react';
import { useTheme } from '../utils/theme';

export function GameTimer() {
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedGame, setSelectedGame] = useState('');
  const intervalRef = useRef<number | null>(null);

  const games = [
    { id: '1', name: 'Mobile Legends', icon: '🎮', color: 'from-purple-500 to-pink-500' },
    { id: '2', name: 'PUBG Mobile', icon: '🔫', color: 'from-orange-500 to-red-500' },
    { id: '3', name: 'Genshin Impact', icon: '⚔️', color: 'from-blue-500 to-cyan-500' },
    { id: '4', name: 'Free Fire', icon: '🔥', color: 'from-yellow-500 to-orange-500' },
    { id: '5', name: 'Game Lainnya', icon: '🎯', color: 'from-green-500 to-emerald-500' },
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hrs.toString().padStart(2, '0'),
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const handleStartPause = () => {
    if (!selectedGame && !isRunning) {
      alert('Pilih game terlebih dahulu!');
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setSelectedGame('');
  };

  const { hours, minutes, seconds } = formatTime(time);
  const progress = Math.min((time / 7200) * 100, 100); // 2 hours max

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/10'
          : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'
      }`}>
        <h2 className={theme === 'dark' ? 'text-white mb-2' : 'text-gray-900 mb-2'}>
          Game Timer ⏱️
        </h2>
        <p className={theme === 'dark' ? 'text-purple-200 text-sm' : 'text-purple-700 text-sm'}>
          Lacak waktu bermain game Anda secara real-time
        </p>
      </div>

      {/* Game Selection */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Gamepad2 className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Pilih Game</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => !isRunning && setSelectedGame(game.name)}
              disabled={isRunning}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedGame === game.name
                  ? `bg-gradient-to-r ${game.color} border-transparent text-white shadow-lg`
                  : theme === 'dark'
                    ? 'bg-slate-700/30 border-slate-600 text-gray-300 hover:border-purple-500'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-purple-400'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-3xl mb-2">{game.icon}</div>
              <p className="text-sm">{game.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Circular Timer */}
      <div className={`backdrop-blur-sm border rounded-2xl p-8 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col items-center">
          {/* Circular Progress */}
          <div className="relative w-64 h-64 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke={theme === 'dark' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(209, 213, 219, 0.5)'}
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-5xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {hours}:{minutes}:{seconds}
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedGame || 'Pilih game'}
              </p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 w-full">
            <button
              onClick={handleStartPause}
              className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                isRunning
                  ? theme === 'dark'
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Mulai</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              className={`px-6 py-4 rounded-xl flex items-center justify-center transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Session Stats */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Statistik Sesi
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-purple-500/10 border border-purple-500/30'
              : 'bg-purple-50 border border-purple-200'
          }`}>
            <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
              Waktu Bermain
            </p>
            <p className={`text-2xl ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              {minutes}:{seconds}
            </p>
          </div>
          <div className={`p-4 rounded-xl ${
            theme === 'dark'
              ? 'bg-blue-500/10 border border-blue-500/30'
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              Progress
            </p>
            <p className={`text-2xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {progress.toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      {isRunning && (
        <div className={`border rounded-2xl p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
        }`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
            💡 <strong>Tips:</strong> Ingat untuk istirahat setiap 30 menit! Peregangan dan istirahatkan mata Anda.
          </p>
        </div>
      )}
    </div>
  );
}