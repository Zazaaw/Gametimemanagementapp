import { useState } from 'react';
import { BookOpen, Heart, AlertCircle, Lightbulb, Shield, Target } from 'lucide-react';
import { useTheme } from '../utils/theme';

export function Education() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'benefits' | 'risks' | 'tips'>('benefits');

  const benefits = [
    {
      icon: '🧠',
      title: 'Melatih Otak',
      description: 'Game strategi dapat meningkatkan kemampuan berpikir kritis dan pemecahan masalah.',
      color: 'from-blue-500/20 to-cyan-500/20',
      colorLight: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-500/30',
      borderColorLight: 'border-blue-200'
    },
    {
      icon: '🤝',
      title: 'Meningkatkan Kerjasama',
      description: 'Game multiplayer mengajarkan cara bekerja sama dalam tim dan komunikasi.',
      color: 'from-green-500/20 to-emerald-500/20',
      colorLight: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-500/30',
      borderColorLight: 'border-green-200'
    },
    {
      icon: '⚡',
      title: 'Melatih Refleks',
      description: 'Game action meningkatkan koordinasi mata-tangan dan kecepatan reaksi.',
      color: 'from-yellow-500/20 to-orange-500/20',
      colorLight: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-500/30',
      borderColorLight: 'border-yellow-200'
    },
    {
      icon: '😊',
      title: 'Menghilangkan Stress',
      description: 'Bermain game dengan waktu yang tepat dapat menjadi hiburan yang menyenangkan.',
      color: 'from-purple-500/20 to-pink-500/20',
      colorLight: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-500/30',
      borderColorLight: 'border-purple-200'
    }
  ];

  const risks = [
    {
      icon: '👁️',
      title: 'Mata Lelah',
      description: 'Terlalu lama menatap layar dapat menyebabkan mata kering, merah, dan sakit kepala.',
      severity: 'medium'
    },
    {
      icon: '😴',
      title: 'Kurang Tidur',
      description: 'Bermain game larut malam mengurangi waktu tidur yang dibutuhkan tubuh.',
      severity: 'high'
    },
    {
      icon: '🏃',
      title: 'Kurang Olahraga',
      description: 'Terlalu banyak duduk bermain game membuat tubuh kurang bergerak dan tidak sehat.',
      severity: 'medium'
    },
    {
      icon: '📚',
      title: 'Prestasi Menurun',
      description: 'Kecanduan game dapat mengganggu waktu belajar dan mengerjakan tugas sekolah.',
      severity: 'high'
    },
    {
      icon: '😡',
      title: 'Mudah Marah',
      description: 'Bermain game terlalu lama bisa membuat emosi tidak stabil dan mudah tersinggung.',
      severity: 'medium'
    },
    {
      icon: '💰',
      title: 'Boros Uang',
      description: 'Membeli item game atau top-up terus-menerus dapat menghabiskan uang jajan.',
      severity: 'medium'
    }
  ];

  const tips = [
    {
      title: 'Aturan 20-20-20',
      description: 'Setiap 20 menit, istirahatkan mata dengan melihat benda sejauh 20 kaki (6 meter) selama 20 detik.',
      icon: '👀',
      category: 'Kesehatan Mata'
    },
    {
      title: 'Batasi Waktu Bermain',
      description: 'Anak-anak sebaiknya bermain game maksimal 1-2 jam per hari. Gunakan timer untuk membantu!',
      icon: '⏰',
      category: 'Manajemen Waktu'
    },
    {
      title: 'Jaga Jarak Layar',
      description: 'Jarak mata ke layar minimal 50-60 cm (satu lengan). Jangan terlalu dekat!',
      icon: '📏',
      category: 'Kesehatan Mata'
    },
    {
      title: 'Duduk dengan Benar',
      description: 'Pastikan posisi duduk tegak, kaki menapak lantai, dan punggung tersandar dengan nyaman.',
      icon: '🪑',
      category: 'Postur Tubuh'
    },
    {
      title: 'Ruang Terang',
      description: 'Bermain di ruangan yang cukup cahaya, jangan bermain di tempat gelap.',
      icon: '💡',
      category: 'Lingkungan'
    },
    {
      title: 'Olahraga Rutin',
      description: 'Tetap aktif! Luangkan waktu minimal 30 menit sehari untuk olahraga atau bermain di luar.',
      icon: '⚽',
      category: 'Kesehatan Tubuh'
    },
    {
      title: 'Prioritas Tugas',
      description: 'Selesaikan PR dan belajar dulu sebelum bermain game. Tugas sekolah lebih penting!',
      icon: '✏️',
      category: 'Prioritas'
    },
    {
      title: 'Tidur Cukup',
      description: 'Anak-anak butuh 8-10 jam tidur. Jangan bermain game sampai larut malam!',
      icon: '🌙',
      category: 'Istirahat'
    }
  ];

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'bg-red-500/20 border-red-500/30 text-red-300';
    if (severity === 'medium') return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
    return 'bg-green-500/20 border-green-500/30 text-green-300';
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
          Edukasi Gaming 📚
        </h2>
        <p className={theme === 'dark' ? 'text-purple-200 text-sm' : 'text-purple-700 text-sm'}>
          Pelajari manfaat, risiko, dan tips bermain game yang sehat
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={`backdrop-blur-sm border rounded-2xl p-2 flex gap-2 ${
        theme === 'dark'
          ? 'bg-slate-800/50 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={() => setActiveSection('benefits')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeSection === 'benefits'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm">Manfaat</span>
        </button>
        <button
          onClick={() => setActiveSection('risks')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeSection === 'risks'
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Risiko</span>
        </button>
        <button
          onClick={() => setActiveSection('tips')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeSection === 'tips'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm">Tips</span>
        </button>
      </div>

      {/* Benefits Section */}
      {activeSection === 'benefits' && (
        <div className="space-y-4 animate-fadeIn">
          <div className={`border rounded-2xl p-5 ${
            theme === 'dark'
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start gap-3">
              <Shield className={`w-6 h-6 mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <h3 className={`mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  Sisi Positif Gaming
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-green-200/80' : 'text-green-800'}`}>
                  Bermain game memiliki banyak manfaat jika dilakukan dengan bijak dan seimbang.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm border rounded-2xl p-5 ${
                  theme === 'dark'
                    ? `bg-gradient-to-r ${benefit.color} ${benefit.borderColor}`
                    : `bg-gradient-to-r ${benefit.colorLight} ${benefit.borderColorLight}`
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{benefit.icon}</div>
                  <div className="flex-1">
                    <h4 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {benefit.title}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks Section */}
      {activeSection === 'risks' && (
        <div className="space-y-4 animate-fadeIn">
          <div className={`border rounded-2xl p-5 ${
            theme === 'dark'
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-6 h-6 mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
              <div>
                <h3 className={`mb-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  Risiko Gaming Berlebihan
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-200/80' : 'text-red-800'}`}>
                  Kenali tanda-tanda gaming yang tidak sehat dan cara mencegahnya.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {risks.map((risk, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm border rounded-2xl p-5 ${
                  risk.severity === 'high'
                    ? theme === 'dark'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-red-50 border-red-200'
                    : theme === 'dark'
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : 'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{risk.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }>
                        {risk.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        risk.severity === 'high'
                          ? theme === 'dark'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-red-100 text-red-700'
                          : theme === 'dark'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.severity === 'high' ? 'Tinggi' : 'Sedang'}
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {risk.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      {activeSection === 'tips' && (
        <div className="space-y-4 animate-fadeIn">
          <div className={`border rounded-2xl p-5 ${
            theme === 'dark'
              ? 'bg-blue-500/10 border-blue-500/30'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              <Target className={`w-6 h-6 mt-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h3 className={`mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  Tips Gaming Sehat
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-200/80' : 'text-blue-800'}`}>
                  Praktik terbaik untuk menjaga keseimbangan gaming dan kehidupan.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm border rounded-2xl p-5 ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-white/10'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                      : 'bg-gradient-to-br from-purple-400 to-blue-400'
                  }`}>
                    <span className="text-white text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {tip.title}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Call to Action */}
      <div className={`border rounded-2xl p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
          : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
      }`}>
        <div className="text-center">
          <BookOpen className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <h3 className={`mb-2 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
            Ingat Selalu
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>
            Gaming yang sehat adalah gaming yang seimbang. Gunakan GameBalance untuk membantu Anda menjaga keseimbangan!
          </p>
        </div>
      </div>
    </div>
  );
}