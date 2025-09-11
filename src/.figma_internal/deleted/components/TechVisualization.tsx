import { motion } from 'motion/react';
import { Shield, Brain, MapPin, Wifi, Database, Lock } from 'lucide-react';

export function TechVisualization() {
  const techIcons = [
    { Icon: Shield, color: 'text-green-400', position: { top: '15%', left: '8%' }, delay: 0 },
    { Icon: Brain, color: 'text-blue-400', position: { top: '25%', right: '12%' }, delay: 0.5 },
    { Icon: MapPin, color: 'text-orange-400', position: { bottom: '30%', left: '15%' }, delay: 1 },
    { Icon: Wifi, color: 'text-purple-400', position: { top: '40%', right: '8%' }, delay: 1.5 },
    { Icon: Database, color: 'text-indigo-400', position: { bottom: '20%', right: '20%' }, delay: 2 },
    { Icon: Lock, color: 'text-cyan-400', position: { top: '60%', left: '10%' }, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Tech Icons Floating */}
      {techIcons.map((item, index) => {
        const { Icon } = item;
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-10`}
            style={item.position}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0, 0.15, 0.1, 0.15, 0.05],
              scale: [0, 1.2, 1, 1.1, 0.9],
              rotate: [0, 360],
              y: [-10, 10, -5, 15, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <Icon size={32} />
          </motion.div>
        );
      })}

      {/* Data Stream Visualization */}
      <div className="absolute top-1/4 left-0 w-full h-px">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"
            style={{ left: `${i * 5}%` }}
            animate={{
              x: ['0%', '500%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* AI Processing Visualization */}
      <motion.div
        className="absolute top-12 right-1/4 w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="40"
              cy="40"
              r={10 + i * 5}
              fill="none"
              stroke={`hsl(${220 + i * 20}, 60%, 60%)`}
              strokeWidth="1"
              strokeOpacity="0.1"
              strokeDasharray="4 4"
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          <circle cx="40" cy="40" r="3" fill="rgba(59, 130, 246, 0.3)" />
        </svg>
      </motion.div>

      {/* Blockchain Chain Visualization */}
      <div className="absolute bottom-1/3 left-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: [0, 0.3, 0.1],
              x: [0, 5, 0] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="w-3 h-3 bg-purple-300/20 border border-purple-300/30 mr-1" />
            <div className="w-4 h-px bg-purple-300/20" />
          </motion.div>
        ))}
      </div>

      {/* Geo-fence Radar Sweep */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 192 192" className="w-full h-full">
          <defs>
            <radialGradient id="radar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
              <stop offset="70%" stopColor="rgba(34, 197, 94, 0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="96" cy="96" r="90" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="1" />
          <circle cx="96" cy="96" r="60" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="1" />
          <circle cx="96" cy="96" r="30" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="1" />
          <path
            d="M 96 96 L 96 6 A 90 90 0 0 1 156 54 Z"
            fill="url(#radar)"
          />
        </svg>
      </motion.div>

      {/* Security Nodes Network */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Network Grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <motion.line
              x1={`${i * 12.5}%`}
              y1="0%"
              x2={`${i * 12.5}%`}
              y2="100%"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="0.5"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
            <motion.line
              x1="0%"
              y1={`${i * 12.5}%`}
              x2="100%"
              y2={`${i * 12.5}%`}
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="0.5"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2 + 1,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}