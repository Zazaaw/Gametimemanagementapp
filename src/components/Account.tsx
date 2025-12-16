import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Edit2, Save, Bell, Clock, Target, Moon, Volume2, Smartphone, Info, X, Shield, HelpCircle, FileText, Lock, Download, Trash2, Share2 } from 'lucide-react';
import { user as userApi, auth } from '../utils/api';
import { useTheme } from '../utils/theme';

export function Account() {
  const { theme, toggleTheme } = useTheme();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // User data
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    birthdate: '',
  });

  // Temporary data for editing
  const [tempData, setTempData] = useState({ ...userData });

  // Settings
  const [dailyLimit, setDailyLimit] = useState(120);
  const [weeklyLimit, setWeeklyLimit] = useState(840);
  const [breakReminder, setBreakReminder] = useState(true);
  const [limitWarning, setLimitWarning] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  // Load profile and settings on mount
  useEffect(() => {
    loadProfileData();
    setIsDemoMode(!auth.isAuthenticated());
  }, []);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const data = await userApi.getProfile();
      
      // Update profile data
      if (data.profile) {
        const profileData = {
          name: data.profile.name || '',
          username: data.profile.username || '',
          email: data.profile.email || '',
          phone: data.profile.phone || '',
          birthdate: data.profile.birthdate || '',
        };
        setUserData(profileData);
        setTempData(profileData);
      }
      
      // Update settings
      if (data.settings) {
        setDailyLimit(data.settings.dailyLimit || 120);
        setWeeklyLimit(data.settings.weeklyLimit || 840);
        setBreakReminder(data.settings.breakReminder ?? true);
        setLimitWarning(data.settings.limitWarning ?? true);
        setSound(data.settings.sound ?? true);
        setVibration(data.settings.vibration ?? true);
      }
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      // Don't show alert if it's just because user is in demo mode
      if (error.message !== 'Unauthorized') {
        console.log('Using default profile data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = () => {
    setTempData({ ...userData });
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const result = await userApi.updateProfile({
        name: tempData.name,
        username: tempData.username,
        email: tempData.email,
        phone: tempData.phone,
        birthdate: tempData.birthdate,
      });
      
      setUserData({ ...tempData });
      setShowEditModal(false);
      
      if (isDemoMode) {
        alert('⚠️ Mode Demo: Perubahan tidak disimpan secara permanen. Silakan daftar akun untuk menyimpan data.');
      } else {
        alert('Profil berhasil disimpan! ✅');
      }
    } catch (error: any) {
      console.error('Failed to save profile:', error);
      alert('Gagal menyimpan profil: ' + error.message);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData({ ...tempData, [field]: value });
  };

  // Auto-save settings when they change
  useEffect(() => {
    if (!isLoading) {
      saveSettings();
    }
  }, [dailyLimit, weeklyLimit, breakReminder, limitWarning, sound, vibration]);

  const saveSettings = async () => {
    try {
      await userApi.updateSettings({
        dailyLimit,
        weeklyLimit,
        breakReminder,
        limitWarning,
        sound,
        nightMode: theme === 'dark',
        vibration,
      });
    } catch (error: any) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleExportData = () => {
    alert('Data Anda sedang disiapkan untuk diunduh... 📊');
  };

  const handleClearCache = () => {
    if (confirm('Hapus semua cache aplikasi?')) {
      alert('Cache berhasil dibersihkan! ✅');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Apakah Anda yakin ingin menghapus akun? Semua data akan hilang permanen!')) {
      alert('Fitur ini belum tersedia. Hubungi support untuk menghapus akun.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Demo Mode Warning */}
      {isDemoMode && (
        <div className={`border rounded-2xl p-4 flex items-start gap-3 ${
          theme === 'dark'
            ? 'bg-yellow-500/10 border-yellow-500/30'
            : 'bg-yellow-50 border-yellow-300'
        }`}>
          <Info className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
          }`} />
          <div>
            <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
              Mode Demo Aktif
            </p>
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-yellow-200/70' : 'text-yellow-700'}`}>
              Perubahan tidak akan disimpan secara permanen. Daftar akun untuk menyimpan data Anda.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/10'
          : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'
      }`}>
        <h2 className={theme === 'dark' ? 'text-white mb-2' : 'text-gray-900 mb-2'}>
          Akun Saya
        </h2>
        <p className={theme === 'dark' ? 'text-purple-200 text-sm' : 'text-purple-700 text-sm'}>
          Kelola profil dan pengaturan akun Anda
        </p>
      </div>

      {/* Profile Section */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
            Informasi Profil
          </h3>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center border-4 ${
            theme === 'dark' ? 'border-white/10' : 'border-white shadow-lg'
          }`}>
            <User className="w-12 h-12 text-white" />
          </div>
          <p className={`mt-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {userData.name || 'Nama Pengguna'}
          </p>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            @{userData.username}
          </p>
        </div>

        {/* Profile Info Cards */}
        <div className="space-y-3 mb-6">
          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'
          }`}>
            <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Email</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {userData.email || 'Belum diatur'}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'
          }`}>
            <Phone className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Telepon</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {userData.phone || 'Belum diatur'}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'
          }`}>
            <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Tanggal Lahir</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {userData.birthdate || 'Belum diatur'}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleOpenEdit}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/25"
        >
          <Edit2 className="w-5 h-5" />
          <span>Edit Profil</span>
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl border ${
            theme === 'dark'
              ? 'bg-slate-900 border-white/10'
              : 'bg-white border-gray-200'
          }`}>
            {/* Modal Header */}
            <div className={`sticky top-0 border-b p-6 ${
              theme === 'dark'
                ? 'bg-slate-900 border-white/10'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Edit Profil
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`p-2 rounded-lg transition-all ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className={`text-sm block mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={`text-sm block mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={`text-sm block mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Nomor Telepon
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Phone className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>
              </div>

              {/* Birthdate */}
              <div>
                <label className={`text-sm block mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="date"
                    value={tempData.birthdate}
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                    className={`w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`sticky bottom-0 border-t p-6 ${
              theme === 'dark'
                ? 'bg-slate-900 border-white/10'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 py-3 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/25"
                >
                  <Save className="w-5 h-5" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Limits */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Batas Waktu</h3>
        </div>

        <div className="space-y-6">
          {/* Daily Limit */}
          <div>
            <div className="flex justify-between mb-3">
              <label className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Batas Harian
              </label>
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
                {dailyLimit} menit
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="240"
              step="15"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-500 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'
              }`}
            />
            <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              <span>30m</span>
              <span>240m (4h)</span>
            </div>
          </div>

          {/* Weekly Limit */}
          <div>
            <div className="flex justify-between mb-3">
              <label className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Batas Mingguan
              </label>
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
                {Math.floor(weeklyLimit / 60)}h {weeklyLimit % 60}m
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="1680"
              step="60"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-purple-500 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'
              }`}
            />
            <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              <span>5h</span>
              <span>28h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Notifikasi</h3>
        </div>

        <div className="space-y-4">
          {/* Break Reminder */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Pengingat Istirahat
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                Setiap 30 menit
              </p>
            </div>
            <button
              onClick={() => setBreakReminder(!breakReminder)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                breakReminder ? 'bg-green-500' : theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  breakReminder ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {/* Limit Warning */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Peringatan Batas
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                80% dari batas waktu
              </p>
            </div>
            <button
              onClick={() => setLimitWarning(!limitWarning)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                limitWarning ? 'bg-green-500' : theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  limitWarning ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Target className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Preferensi Aplikasi</h3>
        </div>

        <div className="space-y-4">
          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Volume2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Suara
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Notifikasi suara
                </p>
              </div>
            </div>
            <button
              onClick={() => setSound(!sound)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                sound ? 'bg-green-500' : theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  sound ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {/* Night Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mode Malam
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Tema gelap
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Smartphone className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Getaran
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Feedback haptik
                </p>
              </div>
            </div>
            <button
              onClick={() => setVibration(!vibration)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                vibration ? 'bg-green-500' : theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  vibration ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className={`border rounded-2xl p-5 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
          : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
      }`}>
        <h3 className={`mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
          🎯 Target Minggu Ini
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <input 
              type="checkbox" 
              defaultChecked 
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}>
              Bermain tidak lebih dari {dailyLimit} menit/hari
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}>
              Istirahat setiap 30 menit
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}>
              Tidak bermain setelah jam 10 malam
            </span>
          </div>
        </div>
      </div>

      {/* App Info Button */}
      <button
        onClick={() => setShowInfoModal(true)}
        className={`w-full backdrop-blur-sm border rounded-2xl p-6 transition-all ${
          theme === 'dark'
            ? 'bg-slate-800/50 border-white/10 hover:bg-slate-800/70'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              theme === 'dark'
                ? 'bg-blue-500/10'
                : 'bg-blue-50'
            }`}>
              <Info className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="text-left">
              <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                Informasi Aplikasi
              </h3>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Bantuan, privasi, dan pengaturan lainnya
              </p>
            </div>
          </div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
        </div>
      </button>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl border ${
            theme === 'dark'
              ? 'bg-slate-900 border-white/10'
              : 'bg-white border-gray-200'
          }`}>
            {/* Modal Header */}
            <div className={`sticky top-0 border-b p-6 ${
              theme === 'dark'
                ? 'bg-slate-900 border-white/10'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Informasi Aplikasi
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tentang GameBalance
                  </p>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className={`p-2 rounded-lg transition-all ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* About App */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Tentang Aplikasi</h3>
                </div>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between py-3 border-b ${
                    theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Nama Aplikasi
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      GameBalance
                    </span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-b ${
                    theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Versi
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      1.0.0
                    </span>
                  </div>
                  <div className={`flex items-center justify-between py-3 border-b ${
                    theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Build
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      2024.12.001
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Developer
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      GameBalance Team
                    </span>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Bantuan & Dukungan</h3>
                </div>
                <div className="space-y-2">
                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Panduan Pengguna
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>

                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        FAQ (Pertanyaan Umum)
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>

                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Share2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Hubungi Support
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>
                </div>
              </div>

              {/* Privacy & Security */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Privasi & Keamanan</h3>
                </div>
                <div className="space-y-2">
                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Lock className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Kebijakan Privasi
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>

                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Syarat & Ketentuan
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>

                  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Lisensi Open Source
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>
                </div>
              </div>

              {/* Data Management */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Download className={`w-5 h-5 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Kelola Data</h3>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleExportData();
                      setShowInfoModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 hover:bg-slate-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Download className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Ekspor Data
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>

                  <button
                    onClick={() => {
                      handleClearCache();
                      setShowInfoModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 hover:bg-slate-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Trash2 className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Hapus Cache
                      </span>
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>→</span>
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className={`border rounded-2xl p-5 ${
                theme === 'dark'
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Trash2 className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                  <h3 className={theme === 'dark' ? 'text-red-300' : 'text-red-700'}>Zona Berbahaya</h3>
                </div>

                <button
                  onClick={()=> {
                    handleDeleteAccount();
                    setShowInfoModal(false);
                  }}
                  className={`w-full p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/50'
                      : 'bg-red-100 hover:bg-red-200 border border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Trash2 className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                      Hapus Akun Permanen
                    </span>
                  </div>
                </button>
                <p className={`text-xs mt-3 text-center ${theme === 'dark' ? 'text-red-300/60' : 'text-red-600'}`}>
                  ⚠️ Tindakan ini tidak dapat dibatalkan
                </p>
              </div>

              {/* App Version Footer */}
              <div className={`text-center py-4 border-t ${
                theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  GameBalance v1.0.0
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  © 2024 GameBalance Team. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}