import { motion } from 'motion/react';
import { Shield, Brain, MapPin, Wifi, Database, Lock, Activity, Zap, Globe, Radar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfessionalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Professional Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1643398899826-2fca1e015fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbW9uaXRvcmluZyUyMGRhc2hib2FyZCUyMGRhcmslMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU2NzExMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Professional monitoring dashboard background"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Dark gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-indigo-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/30 via-transparent to-transparent" />
      </div>

      {/* Animated Tech Grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30">
          <defs>
            <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="0.5" strokeOpacity="0.3"/>
              <circle cx="0" cy="0" r="1" fill="rgb(59, 130, 246)" fillOpacity="0.4"/>
            </pattern>
            <linearGradient id="gridFade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="white" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="white" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" mask="url(#gridFade)"/>
        </svg>
      </div>

      {/* Large Floating Tech Icons */}
      <motion.div
        className="absolute top-16 left-16 text-blue-500/20"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Shield size={64} />
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 text-purple-500/20"
        animate={{
          y: [10, -10, 10],
          rotate: [0, -5, 0, 5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Brain size={56} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 text-green-500/20"
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <MapPin size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-32 text-orange-500/20"
        animate={{
          y: [8, -8, 8],
          rotate: [0, -8, 0, 8, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <Activity size={52} />
      </motion.div>

      {/* Animated Data Streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-blue-400/60 via-cyan-400/40 to-transparent"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleY: [0, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Radar Sweeps */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <defs>
            <radialGradient id="radarGradient">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.4)" />
              <stop offset="70%" stopColor="rgba(34, 197, 94, 0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="64" cy="64" r="60" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="2" />
          <circle cx="64" cy="64" r="40" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1" />
          <circle cx="64" cy="64" r="20" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1" />
          <path
            d="M 64 64 L 64 4 A 60 60 0 0 1 124 64 Z"
            fill="url(#radarGradient)"
          />
        </svg>
      </motion.div>

      {/* Floating Blockchain Elements */}
      <div className="absolute bottom-20 left-1/4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="flex items-center mb-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: [0, 0.6, 0.3],
              x: [0, 10, 0] 
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-6 bg-purple-500/30 border-2 border-purple-400/50 mr-2 rounded-sm backdrop-blur-sm" />
            <div className="w-8 h-px bg-purple-400/40" />
          </motion.div>
        ))}
      </div>

      {/* AI Processing Nodes */}
      <motion.div
        className="absolute top-20 left-1/3 w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 96 96" className="w-full h-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="48"
              cy="48"
              r={10 + i * 6}
              fill="none"
              stroke={`hsl(${220 + i * 15}, 70%, 60%)`}
              strokeWidth="2"
              strokeOpacity="0.4"
              strokeDasharray="6 6"
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          <circle cx="48" cy="48" r="4" fill="rgba(59, 130, 246, 0.6)" />
        </svg>
      </motion.div>

      {/* Security Shield Network */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const radius = 200;
          const x = 50 + Math.cos(angle) * (radius / window.innerWidth * 100);
          const y = 50 + Math.sin(angle) * (radius / window.innerHeight * 100);
          
          return (
            <motion.div
              key={i}
              className="absolute w-8 h-8 text-cyan-400/30"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              <Shield size={32} />
            </motion.div>
          );
        })}
      </div>

      {/* Pulsing Geo-fence Zones */}
      <motion.div
        className="absolute top-1/3 left-12 w-40 h-40 border-2 border-orange-400/30 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-16 w-32 h-32 border-2 border-green-400/30 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      {/* Monitoring Wave Effect */}
      <motion.div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 3, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-20 h-20 border-2 border-blue-400/40 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 4, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut"
        }}
      >
        <div className="w-20 h-20 border-2 border-indigo-400/30 rounded-full" />
      </motion.div>
    </div>
  );
}