"use client";
import { useState } from 'react';
import UploadForm from '@/components/UploadForm';
import Dashboard from '@/components/Dashboard';
import { Play, Info } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#141414] text-white selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* Background Gradient / Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent z-10"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 md:px-16 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2 cursor-pointer">
           {/* Logo Style Netflix */}
           <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#E50914] drop-shadow-xl font-bebas">
             QUANTUM<span className="text-white font-light">ROUTE</span>
           </h1>
        </div>
        <div>
          <button className="text-sm font-medium text-white hover:text-gray-300 transition mr-6">
            Tecnologia
          </button>
          <button className="text-sm font-medium text-white hover:text-gray-300 transition">
            Login
          </button>
        </div>
      </nav>

      <main className="relative z-20 px-8 md:px-16 pb-12">
        {!data ? (
          <div className="flex flex-col justify-center min-h-[70vh] max-w-2xl">
            {/* Hero Content */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                 <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold tracking-widest uppercase text-white border border-white/30">
                   QUANTUM CORE
                 </span>
                 <span className="text-green-400 text-sm font-bold tracking-wider">15% ECONOMY</span>
                 <span className="text-gray-400 text-sm">2026</span>
                 <span className="border border-gray-600 px-1 text-xs text-gray-400 rounded-sm">QAOA</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight drop-shadow-2xl">
                OTIMIZAÇÃO <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">QUÂNTICA</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-xl font-medium drop-shadow-md">
                O futuro da logística chegou. Reduza custos, tempo e emissões com o poder do algoritmo QAOA. Sua frota, otimizada na velocidade da luz.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setShowUpload(true)}
                  className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition-all font-bold text-lg hover:scale-105 active:scale-95"
                >
                  <Play className="w-6 h-6 fill-black" />
                  Começar Agora
                </button>
                <button className="flex items-center gap-3 bg-gray-500/30 backdrop-blur-sm text-white px-8 py-3 rounded hover:bg-gray-500/40 transition-all font-bold text-lg hover:scale-105 active:scale-95 border border-white/10">
                  <Info className="w-6 h-6" />
                  Mais Informações
                </button>
              </div>
            </div>

            {/* Upload Modal / Section */}
            {showUpload && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-300">
                 <div className="relative w-full max-w-2xl">
                    <button 
                      onClick={() => setShowUpload(false)}
                      className="absolute -top-12 right-0 text-white hover:text-red-500 transition"
                    >
                      Fechar [X]
                    </button>
                    <UploadForm onDataReceived={setData} />
                 </div>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
             <Dashboard data={data} onReset={() => setData(null)} />
          </div>
        )}
      </main>

      {/* Footer Gradient */}
      <div className="fixed bottom-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
