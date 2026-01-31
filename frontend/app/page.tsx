"use client";
import Link from 'next/link';
import { Play, Info, ArrowRight, CheckCircle, Cpu, Zap, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#141414] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* Background Gradient / Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent z-10"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 md:px-16 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm fixed w-full top-0">
        <div className="flex items-center gap-2 cursor-pointer">
           <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#E50914] drop-shadow-xl font-bebas">
             QUANTUM<span className="text-white font-light">ROUTE</span>
           </h1>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-white hover:text-gray-300 transition">
            Tecnologia
          </button>
          <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-white hover:text-gray-300 transition">
            Como Funciona
          </button>
          <Link href="/system" className="px-5 py-2 bg-[#E50914] hover:bg-[#b2070f] text-white font-bold rounded transition-all shadow-lg hover:shadow-red-900/20">
            Acessar Sistema
          </Link>
        </div>
      </nav>

      <main className="relative z-20 pt-32">
        {/* Hero Section */}
        <section className="px-8 md:px-16 pb-24 min-h-[90vh] flex flex-col justify-center">
            <div className="space-y-6 animate-fade-in-up max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                 <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold tracking-widest uppercase text-white border border-white/30">
                   QUANTUM CORE v1.0
                 </span>
                 <span className="text-green-400 text-sm font-bold tracking-wider">15% ECONOMY</span>
                 <span className="border border-gray-600 px-1 text-xs text-gray-400 rounded-sm">QAOA READY</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight drop-shadow-2xl">
                LOGÍSTICA NA <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-500">VELOCIDADE DA LUZ</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-xl font-medium drop-shadow-md leading-relaxed">
                Otimize suas rotas utilizando inteligência híbrida (Clássica + Quântica). 
                Reduza custos operacionais e emissões de carbono com algoritmos que fogem dos mínimos locais.
              </p>

              <div className="flex flex-wrap gap-4 pt-8">
                <Link 
                  href="/system"
                  className="flex items-center gap-3 bg-[#E50914] text-white px-8 py-4 rounded hover:bg-[#b2070f] transition-all font-bold text-lg hover:scale-105 active:scale-95 shadow-xl shadow-red-900/20"
                >
                  <Play className="w-6 h-6 fill-white" />
                  Testar Agora Grátis
                </Link>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded hover:bg-white/20 transition-all font-bold text-lg border border-white/10"
                >
                  <Info className="w-6 h-6" />
                  Saber Mais
                </button>
              </div>

              <div className="pt-8 flex items-center gap-8 text-sm text-gray-500 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Zero Instalação</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Setup Instantâneo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Compatível com Excel/CSV</span>
                </div>
              </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">O Diferencial Quântico</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Por que somos diferentes do Waze ou Google Maps?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 bg-[#141414] rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <Cpu className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Quantum-Inspired</h3>
                <p className="text-gray-400 leading-relaxed">
                  Algoritmos convencionais travam em soluções "boas". Nós usamos 
                  <span className="text-blue-400 font-semibold"> Tunelamento Quântico </span> 
                  simulado para encontrar a solução <strong>ótima</strong> (Mínimo Global).
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 bg-[#141414] rounded-2xl border border-white/5 hover:border-green-500/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-green-900/20 rounded-xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">ROI Imediato</h3>
                <p className="text-gray-400 leading-relaxed">
                  Não é pesquisa acadêmica. É dinheiro no caixa. Reduza quilometragem ociosa e economize até 
                  <span className="text-green-400 font-bold"> 15% </span> 
                  nos custos de frota logo no primeiro mês.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 bg-[#141414] rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Zero Cost Stack</h3>
                <p className="text-gray-400 leading-relaxed">
                  Arquitetura 100% Serverless e Open-Source. Sem licenças caras, sem servidores dedicados. 
                  Você paga apenas pelo valor que a ferramenta gera.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24 bg-[#141414]">
           <div className="max-w-7xl mx-auto px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                 <h2 className="text-4xl font-bold mb-6">Complexidade Zero.</h2>
                 <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                   Você não precisa ser um físico quântico para usar nossa plataforma. 
                   Simplificamos todo o processo em 3 etapas fáceis.
                 </p>
                 
                 <div className="space-y-8">
                   <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shrink-0">1</div>
                     <div>
                       <h4 className="text-xl font-bold text-white mb-2">Upload do CSV</h4>
                       <p className="text-gray-400">Baixe nosso template e suba sua lista de entregas e veículos.</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shrink-0">2</div>
                     <div>
                       <h4 className="text-xl font-bold text-white mb-2">Processamento Híbrido</h4>
                       <p className="text-gray-400">Nossa IA decide a melhor estratégia (Clássica ou Quântica) para o seu cenário.</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shrink-0">3</div>
                     <div>
                       <h4 className="text-xl font-bold text-white mb-2">Execução</h4>
                       <p className="text-gray-400">Receba as rotas otimizadas e envie direto para o WhatsApp dos motoristas.</p>
                     </div>
                   </div>
                 </div>

                 <div className="mt-12">
                   <Link href="/system" className="inline-flex items-center gap-2 text-[#E50914] font-bold hover:underline">
                     Começar agora mesmo <ArrowRight className="w-4 h-4" />
                   </Link>
                 </div>
               </div>
               
               <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
                 <div className="relative bg-[#1f1f1f] border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div>
                        <div className="w-8 h-8 bg-green-500/20 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-white/5 rounded w-3/4"></div>
                        <div className="h-4 bg-white/5 rounded w-1/2"></div>
                        <div className="h-4 bg-white/5 rounded w-full"></div>
                      </div>
                      <div className="pt-4 flex justify-end">
                        <div className="px-4 py-2 bg-blue-600 rounded text-xs font-bold text-white">
                          OPTIMIZING...
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* CTA Footer */}
        <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black text-center px-8">
           <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para o futuro?</h2>
           <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
             Junte-se às empresas que já estão economizando com logística inteligente.
           </p>
           <Link 
             href="/system"
             className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full hover:bg-gray-200 transition-all font-bold text-xl hover:scale-105 active:scale-95"
           >
             Acessar Plataforma
             <ArrowRight className="w-6 h-6" />
           </Link>
        </section>

      </main>

      <footer className="py-8 bg-black text-center text-gray-600 text-sm border-t border-white/5">
        <p>&copy; 2026 QuantumRoute. Todos os direitos reservados.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-white transition">Privacidade</a>
          <a href="#" className="hover:text-white transition">Termos</a>
          <a href="#" className="hover:text-white transition">Contato</a>
        </div>
      </footer>
    </div>
  );
}
