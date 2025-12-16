import { useEffect, useState } from 'react';
import { Gamepad2, Zap } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-150"></div>
      </div>

      {/* Logo and Icon */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        {/* Gaming Icon with Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-full p-8 shadow-2xl transform hover:scale-105 transition-transform">
            <Gamepad2 className="w-24 h-24 text-white animate-bounce-slow" />
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-spin-slow">
              <Zap className="w-6 h-6 text-yellow-900" />
            </div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-5xl text-white mb-3 animate-slide-up">
          GameBalance
        </h1>
        <p className="text-purple-300 text-center mb-12 animate-slide-up-delay">
          Kelola Waktu Gaming Dengan Bijak
        </p>

        {/* Loading Progress Bar */}
        <div className="w-64 mb-4">
          <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full transition-all duration-300 ease-out shadow-lg shadow-purple-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-purple-300 text-sm mt-3">
            {progress}%
          </p>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 text-gray-400 text-sm animate-fade-in-delay">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Memuat aplikasi...</span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-500 text-xs">
          Versi 1.0.0
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.3s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.5s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .delay-75 {
          animation-delay: 0.75s;
        }

        .delay-150 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
