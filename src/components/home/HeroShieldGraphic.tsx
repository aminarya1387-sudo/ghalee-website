'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Cloud, Server, HardDrive, CheckCircle } from 'lucide-react';

export function HeroShieldGraphic() {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0066cc]/20 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Orbit 1: Outer Pulse Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-[#0066cc]/25"
      >
        {/* Floating Node 1: Cloud Storage */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-2.5 shadow-lg border border-black/5 flex items-center gap-2">
          <Cloud className="w-4 h-4 text-[#0066cc]" />
          <span className="text-[11px] font-semibold text-[#1d1d1f]">Cloud S3 / Drive</span>
        </div>

        {/* Floating Node 2: ESXi / Virtual Machine */}
        <div className="absolute bottom-4 left-10 bg-white rounded-2xl p-2.5 shadow-lg border border-black/5 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-semibold text-[#1d1d1f]">VMware ESXi</span>
        </div>

        {/* Floating Node 3: Encryption */}
        <div className="absolute bottom-8 right-6 bg-white rounded-2xl p-2.5 shadow-lg border border-black/5 flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-600" />
          <span className="text-[11px] font-semibold text-[#1d1d1f]">SHA-512 Encrypt</span>
        </div>
      </motion.div>

      {/* Orbit 2: Middle Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[68%] h-[68%] rounded-full border border-[#0066cc]/20"
      >
        <div className="absolute top-4 right-2 bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-md border border-black/5 flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-[#0066cc]" />
          <span className="text-[10px] font-medium text-[#1d1d1f]">SQL Server</span>
        </div>

        <div className="absolute bottom-2 left-6 bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-md border border-black/5 flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 text-[#6e6e73]" />
          <span className="text-[10px] font-medium text-[#1d1d1f]">Local / SAN</span>
        </div>
      </motion.div>

      {/* Centerpiece: Glowing Apple-Style Glass Shield */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.03 }}
        className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-white via-white/90 to-[#f5f5f7] p-4 shadow-[0_20px_50px_rgba(0,102,204,0.18)] border border-white/80 flex flex-col items-center justify-center text-center cursor-default backdrop-blur-xl"
      >
        {/* Shield Icon Frame */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#00478f] flex items-center justify-center shadow-lg shadow-[#0066cc]/30 text-white">
            <Shield className="w-9 h-9 sm:w-11 sm:h-11" strokeWidth={1.75} />
          </div>
          <span className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" />
          </span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-[#1d1d1f] tracking-normal">
          قلعه امن داده‌ها
        </h4>
        <span className="text-[10px] sm:text-xs text-[#0066cc] font-semibold mt-0.5">
          حفاظت ۱۰۰٪ بومی
        </span>

        {/* Verification Status */}
        <div className="mt-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-700 font-medium">
          یکپارچه و فعال
        </div>
      </motion.div>
    </div>
  );
}
