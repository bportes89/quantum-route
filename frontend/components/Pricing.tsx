import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Investimento que se paga no 1º dia
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal para sua frota. Cancele a qualquer momento.
            Sem taxas escondidas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plano Starter */}
          <div className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:border-gray-600 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Starter</h3>
            <div className="text-3xl font-bold mb-6">Grátis<span className="text-sm text-gray-500 font-normal"> / sempre</span></div>
            <p className="text-gray-400 text-sm mb-6">Para pequenos negócios e testes rápidos.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-500 mr-2" /> Até 1 veículo</li>
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-500 mr-2" /> Até 15 paradas/rota</li>
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-500 mr-2" /> Otimizador Clássico</li>
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-500 mr-2" /> Exportação PDF</li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition text-white font-medium">
              Começar Grátis
            </button>
          </div>

          {/* Plano Quantum - DESTAQUE */}
          <div className="border-2 border-cyan-500 bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 transform scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
              Mais Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Quantum PRO</h3>
            <div className="text-4xl font-bold mb-6">R$ 89<span className="text-sm text-gray-500 font-normal"> /veículo ativo/mês</span></div>
            <p className="text-gray-300 text-sm mb-6">Poder máximo de otimização para frotas reais.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Veículos Ilimitados (Cadastrados)</li>
              <li className="flex items-center text-white"><Check className="w-5 h-5 text-cyan-400 mr-2" /> <strong>Quantum-Ready Solver</strong></li>
              <li className="flex items-center text-white"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Janelas de Tempo (Time Windows)</li>
              <li className="flex items-center text-white"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Relatório de Economia CO₂</li>
              <li className="flex items-center text-white"><Check className="w-5 h-5 text-cyan-400 mr-2" /> Suporte via WhatsApp</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 transition text-white font-bold shadow-lg">
              Testar Quantum PRO
            </button>
          </div>

          {/* Plano Enterprise */}
          <div className="border border-gray-800 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:border-gray-600 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold mb-6">Sob Medida</div>
            <p className="text-gray-400 text-sm mb-6">Para grandes operações logísticas (+50 veículos).</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-purple-500 mr-2" /> API Dedicada</li>
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-purple-500 mr-2" /> Integração com ERPs</li>
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-purple-500 mr-2" /> White Label (Sua Marca)</li>
              <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-purple-500 mr-2" /> SLA Garantido</li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition text-white font-medium">
              Falar com Vendas
            </button>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-gray-800 pt-10">
          <p className="text-gray-400 text-sm">
            * O "Quantum-Ready Solver" utiliza algoritmos inspirados em computação quântica (Simulated Annealing) rodando em hardware clássico de alta performance.
          </p>
        </div>
      </div>
    </section>
  );
}