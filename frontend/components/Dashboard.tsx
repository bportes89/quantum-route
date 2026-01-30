"use client";
import { ArrowLeft, Zap, Clock, Map as MapIcon, TrendingUp, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#181818] animate-pulse flex items-center justify-center text-gray-500">Inicializando Satélites...</div>
});

export default function Dashboard({ data, onReset }: { data: any, onReset: () => void }) {
  const { total_distance_km, total_duration_min, savings_percent, comparison, routes } = data;

  return (
    <div className="w-full max-w-7xl mx-auto pt-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-sm font-bold">Voltar ao Menu</span>
        </button>
        <div className="flex items-center gap-4">
           <div className="text-right">
             <h3 className="text-white font-bold text-lg">Relatório da Missão</h3>
             <p className="text-xs text-gray-500 uppercase">Quantum ID: #8X92-Q</p>
           </div>
           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
             Q
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Stats */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Main Stat Card - Savings */}
          <div className="bg-[#181818] border border-[#333] p-6 rounded-lg relative overflow-hidden group hover:border-green-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-24 h-24 text-green-500" />
            </div>
            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Economia Projetada</h4>
            <div className="text-6xl font-black text-green-500 tracking-tighter">
              {savings_percent}%
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Otimização via <span className="text-white font-bold">QAOA Hybrid Solver</span> vs. Baseline Clássico.
            </p>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#181818] border border-[#333] p-4 rounded-lg hover:bg-[#202020] transition-colors">
              <MapIcon className="w-6 h-6 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-white">{total_distance_km} <span className="text-sm text-gray-500">km</span></div>
              <div className="text-xs text-gray-400">Distância Total</div>
            </div>
            <div className="bg-[#181818] border border-[#333] p-4 rounded-lg hover:bg-[#202020] transition-colors">
              <Clock className="w-6 h-6 text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-white">{total_duration_min} <span className="text-sm text-gray-500">min</span></div>
              <div className="text-xs text-gray-400">Tempo Estimado</div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-[#181818] border border-[#333] rounded-lg overflow-hidden">
             <div className="bg-[#202020] px-4 py-3 border-b border-[#333] flex justify-between items-center">
               <span className="text-sm font-bold text-white">Benchmark</span>
               <Zap className="w-4 h-4 text-yellow-500" />
             </div>
             <div className="p-4 space-y-4">
               <div className="flex justify-between items-center border-b border-[#333] pb-2">
                 <span className="text-gray-400 text-sm">Método Clássico</span>
                 <span className="text-white font-mono">{comparison.classic.distance_km} km</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-blue-400 text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    Quantum
                 </span>
                 <span className="text-green-400 font-mono font-bold">{comparison.quantum.distance_km} km</span>
               </div>
             </div>
          </div>
        </div>

        {/* Right Col: Map */}
        <div className="lg:col-span-2 h-[600px] bg-[#181818] rounded-lg border border-[#333] overflow-hidden relative shadow-2xl">
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur text-white px-3 py-1 rounded border border-white/10 text-xs font-mono">
            LIVE TRACKING // QUANTUM NETWORK
          </div>
          <MapComponent routes={routes} />
          
          {/* Overlay Gradient on Map Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Episodes / Details Section */}
      <div className="mt-12">
        <h3 className="text-white font-bold text-xl mb-4">Manifesto de Execução</h3>
        <p className="text-gray-400 text-sm mb-6 max-w-2xl">
          Para realizar a economia projetada de <span className="text-green-500 font-bold">{savings_percent}%</span>, os motoristas devem seguir rigorosamente a sequência abaixo. 
          Use os botões para exportar ou navegar.
        </p>

        <div className="space-y-4">
           {routes.map((route: any, i: number) => {
             // Create Google Maps URL
             const origin = `${route.route[0].lat},${route.route[0].lng}`;
             const destination = `${route.route[route.route.length - 1].lat},${route.route[route.route.length - 1].lng}`;
             const waypoints = route.route.slice(1, -1).map((p: any) => `${p.lat},${p.lng}`).join('|');
             const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;

             return (
               <div key={i} className="bg-[#181818] border border-[#333] rounded-lg overflow-hidden">
                 <div className="p-4 bg-[#202020] border-b border-[#333] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center font-bold border border-blue-500/20">
                        {route.vehicle_id}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Veículo {route.vehicle_id}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><MapIcon className="w-3 h-3" /> {route.distance_km} km</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.route.length} paradas</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <a 
                        href={gmapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                      >
                        <MapIcon className="w-4 h-4" />
                        Navegar (Google Maps)
                      </a>
                      <button className="flex items-center gap-2 bg-[#333] hover:bg-[#444] text-white px-4 py-2 rounded text-sm font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4 rotate-[-45deg]" />
                        Enviar p/ Motorista
                      </button>
                    </div>
                 </div>
                 
                 {/* Steps List */}
                 <div className="p-4 bg-[#141414]/50">
                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">
                     Sequência Otimizada
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {route.route.map((point: any, idx: number) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className={`
                            px-3 py-1 rounded-full border 
                            ${idx === 0 || idx === route.route.length - 1 
                              ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                              : 'bg-gray-800 border-gray-700 text-gray-300'}
                          `}>
                            <span className="font-mono font-bold mr-2">{idx + 1}</span>
                            {idx === 0 ? 'DEPÓSITO' : `Entrega #${point.id || idx}`}
                          </div>
                          {idx < route.route.length - 1 && (
                            <div className="w-4 h-[1px] bg-gray-700 mx-1"></div>
                          )}
                        </div>
                      ))}
                   </div>
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
}
