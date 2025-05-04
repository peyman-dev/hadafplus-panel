import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'pulse' | 'skeleton';
}

export function Loading({ 
  message = 'Loading...', 
  size = 'md', 
  variant = 'spinner' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'spinner':
        return (
          <motion.div
            className={`border-4 border-gray-200 rounded-full ${sizeClasses[size]}`}
            style={{
              borderTopColor: '#3B82F6',
              borderRightColor: '#3B82F6'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              ease: "linear",
              repeat: Infinity
            }}
          />
        );
      case 'pulse':
        return (
          <motion.div
            className={`bg-blue-500 rounded-full ${sizeClasses[size]}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        );
      case 'skeleton':
        return (
          <div className="space-y-3">
            <motion.div
              className="h-4 bg-gray-200 rounded w-3/4"
              animate={{
                opacity: [0.7, 0.4, 0.7]
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded w-1/2"
              animate={{
                opacity: [0.7, 0.4, 0.7]
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded w-5/6"
              animate={{
                opacity: [0.7, 0.4, 0.7]
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.4
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen fixed bg-black/50 w-dvw z-50 text-white" role="status">
      {renderLoadingIndicator()}
      {message && variant !== 'skeleton' && (
        <p className="text-white text-sm font-medium">{message}</p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
}