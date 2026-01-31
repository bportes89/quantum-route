"use client";
import { useState } from 'react';
import Link from 'next/link';
import UploadForm from '@/components/UploadForm';
import Dashboard from '@/components/Dashboard';
import { ArrowLeft } from 'lucide-react';

export default function SystemPage() {
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-red-600 selection:text-white">
      {/* Simple Header */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/50 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-wider">Voltar ao Site</span>
        </Link>
        <div className="flex items-center gap-2">
           <h1 className="text-xl font-bold tracking-tighter text-[#E50914] font-bebas">
             QUANTUM<span className="text-white font-light">ROUTE</span>
           </h1>
           <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-xs font-bold rounded border border-blue-500/30">SYSTEM v1.0</span>
        </div>
      </nav>

      <main className="p-8">
        {!data ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in zoom-in duration-300">
            <div className="w-full max-w-2xl space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Iniciar Otimização</h2>
                <p className="text-gray-400">Faça upload do seu arquivo CSV para começar a otimização quântica.</p>
              </div>
              
              <div className="bg-[#1f1f1f] p-8 rounded-xl border border-white/10 shadow-2xl">
                <UploadForm onDataReceived={setData} />
              </div>

              <div className="text-center">
                 <p className="text-xs text-gray-500">
                   Ambiente Seguro • Criptografia End-to-End • Processamento Híbrido
                 </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
             <Dashboard data={data} onReset={() => setData(null)} />
          </div>
        )}
      </main>
    </div>
  );
}
