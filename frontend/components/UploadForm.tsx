"use client";
import { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Loader2, Cpu } from 'lucide-react';

export default function UploadForm({ onDataReceived }: { onDataReceived: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Artificial delay for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use Environment Variable for API URL (Production Ready)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const response = await axios.post(`${API_URL}/optimize`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onDataReceived(response.data);
    } catch (err) {
      console.error(err);
      setError('Erro na conexão com o núcleo quântico.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181818] rounded-md shadow-2xl border border-[#333] overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-6 border-b border-[#333] flex items-center justify-between">
         <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <Cpu className="text-blue-500" />
           Quantum Core Input
         </h2>
         <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500"></div>
         </div>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm mb-2">
            Carregue seus dados de logística para iniciar a simulação QAOA.
          </p>
          <a href="/template.csv" download className="text-xs text-blue-400 hover:text-blue-300 underline">
            Baixar modelo CSV padrão
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            />
            <div className={`
              border-2 border-dashed rounded-lg p-10 transition-all duration-300
              flex flex-col items-center justify-center
              ${file 
                ? 'border-green-500/50 bg-green-500/5' 
                : 'border-gray-600 group-hover:border-white group-hover:bg-[#252525]'
              }
            `}>
              {file ? (
                <>
                  <FileText className="w-12 h-12 text-green-400 mb-3 animate-bounce" />
                  <span className="font-bold text-white text-lg">{file.name}</span>
                  <span className="text-sm text-green-400">Pronto para processar</span>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 group-hover:text-white mb-3 transition-colors" />
                  <span className="font-bold text-gray-300 group-hover:text-white transition-colors">Arraste ou clique para upload</span>
                  <span className="text-xs text-gray-500 mt-2">Suporta .CSV (VRPTW Standard)</span>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm text-center animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-[#E50914] hover:bg-[#b2070f] disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando Quantum Bits...
              </>
            ) : (
              'Iniciar Otimização'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
