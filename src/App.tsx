import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { GameTimer } from './components/GameTimer';
import { Education } from './components/Education';
import { Statistics } from './components/Statistics';
import { Account } from './components/Account';
import { Settings } from './components/Settings';
import { Home, Timer, BookOpen, BarChart3, User, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { auth } from './utils/api';
import { ThemeProvider, useTheme } from './utils/theme';

type TabType = 'home' | 'timer' | 'education' | 'stats' | 'account' | 'settings';

function AppContent() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const token = auth.getToken();
      const storedUserId = localStorage.getItem('userId');
      const storedUsername = localStorage.getItem('username');
      
      if (token && storedUserId && storedUsername) {
        setIsAuthenticated(true);
        setUserId(storedUserId);
        setUsername(storedUsername);
      }
    };

    if (!showSplash) {
      checkAuth();
    }
  }, [showSplash]);

  const handleLogin = (user: string, id: string) => {
    setUsername(user);
    setUserId(id);
    setIsAuthenticated(true);
    
    // Store username in localStorage for persistence
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      auth.signout();
      localStorage.removeItem('username');
      setIsAuthenticated(false);
      setUsername('');
      setUserId('');
      setActiveTab('home');
    }
  };

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Show login screen
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Main app
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'timer':
        return <GameTimer />;
      case 'education':
        return <Education />;
      case 'stats':
        return <Statistics />;
      case 'account':
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen pb-20 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-md border-b sticky top-0 z-10 ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-white/10'
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-xl">🎮</span>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GameBalance
                </h1>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Halo, {username}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`p-2.5 rounded-xl transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-md border-t ${
        theme === 'dark'
          ? 'bg-slate-900/80 border-white/10'
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('timer')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'timer'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Timer className="w-5 h-5" />
              <span className="text-xs">Timer</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Edukasi</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Statistik</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'account'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Akun</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}