import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingNode {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}

export function AnimatedBackground() {
  const [nodes, setNodes] = useState<FloatingNode[]>([]);
  const [connections, setConnections] = useState<Array<{ from: FloatingNode; to: FloatingNode }>>([]);

  useEffect(() => {
    // Generate floating nodes
    const generatedNodes: FloatingNode[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 4 + 2,
      color: ['text-blue-400', 'text-indigo-400', 'text-purple-400', 'text-cyan-400'][Math.floor(Math.random() * 4)]
    }));

    setNodes(generatedNodes);

    // Generate connections between nearby nodes
    const generatedConnections: Array<{ from: FloatingNode; to: FloatingNode }> = [];
    generatedNodes.forEach((node, i) => {
      generatedNodes.slice(i + 1).forEach(otherNode => {
        const distance = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
        );
        if (distance < 25 && Math.random() > 0.5) {
          generatedConnections.push({ from: node, to: otherNode });
        }
      });
    });

    setConnections(generatedConnections);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30" />
      
      {/* Geometric Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-gray-600" />
        </svg>
      </div>

      {/* Floating Geo-fencing Zones */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-200/30 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 border-2 border-purple-200/30 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-indigo-200/30 rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Network Nodes and Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Render connections */}
        {connections.map((connection, index) => (
          <motion.line
            key={index}
            x1={`${connection.from.x}%`}
            y1={`${connection.from.y}%`}
            x2={`${connection.to.x}%`}
            y2={`${connection.to.y}%`}
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.3, 0] 
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Floating Network Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute w-2 h-2 rounded-full bg-current ${node.color} opacity-40`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
          }}
          animate={{
            y: [-5, 5, -5],
            x: [-3, 3, -3],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + node.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
        />
      ))}

      {/* AI Brain Visualization */}
      <motion.div
        className="absolute top-16 left-1/4 w-16 h-16"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-blue-300/20">
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Blockchain Blocks */}
      <div className="absolute bottom-20 right-32">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-purple-300/20 border border-purple-300/30 mb-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Pulsing Safety Shield */}
      <motion.div
        className="absolute top-1/3 left-12"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" className="text-green-300">
          <path 
            fill="currentColor" 
            fillOpacity="0.2"
            stroke="currentColor" 
            strokeOpacity="0.4"
            strokeWidth="1"
            d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"
          />
        </svg>
      </motion.div>

      {/* Data Flow Particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            x: [0, 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear"
          }}
        />
      ))}

      {/* Monitoring Waves */}
      <motion.div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 border-2 border-blue-300/20 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 border-2 border-indigo-300/20 rounded-full" />
      </motion.div>
    </div>
  );
}