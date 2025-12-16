import { Shield, Info, HelpCircle, FileText, Lock, Trash2, Download, Share2 } from 'lucide-react';
import { useTheme } from '../utils/theme';

export function Settings() {
  const { theme } = useTheme();
  
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

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/10'
          : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200'
      }`}>
        <h2 className={theme === 'dark' ? 'text-white mb-2' : 'text-gray-900 mb-2'}>
          Pengaturan
        </h2>
        <p className={theme === 'dark' ? 'text-purple-200 text-sm' : 'text-purple-700 text-sm'}>
          Informasi aplikasi dan pengaturan lainnya
        </p>
      </div>

      {/* About App */}
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Tentang Aplikasi</h3>
        </div>

        <div className="space-y-4">
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
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Bantuan & Dukungan</h3>
        </div>

        <div className="space-y-3">
          <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
            theme === 'dark'
              ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
              ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
              ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Privasi & Keamanan</h3>
        </div>

        <div className="space-y-3">
          <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
            theme === 'dark'
              ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
              ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
              ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
      <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Download className={`w-5 h-5 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
          <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Kelola Data</h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
            onClick={handleClearCache}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              theme === 'dark'
                ? 'bg-slate-700/30 hover:bg-slate-700/50'
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
      <div className={`border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-red-500/10 border-red-500/30'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-2 mb-5">
          <Trash2 className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
          <h3 className={theme === 'dark' ? 'text-red-300' : 'text-red-700'}>Zona Berbahaya</h3>
        </div>

        <button
          onClick={handleDeleteAccount}
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
      <div className={`text-center py-6 border-t ${
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
  );
}