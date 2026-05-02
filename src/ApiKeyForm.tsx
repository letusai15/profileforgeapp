import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, AlertTriangle, ArrowRight } from 'lucide-react';
import { useSettings } from './SettingsContext';

export default function ApiKeyForm() {
  const [inputKey, setInputKey] = useState('');
  const { setGeminiKey } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      setGeminiKey(inputKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-[#1D1D1F] font-sans selection:bg-[#0A66C2]/10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl border border-[#E5E7EB]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center">
            <Key className="w-8 h-8 text-[#0A66C2]" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-center mb-2">Welcome to ProfileForge</h1>
        <p className="text-2xl font-semibold tracking-tight text-center mb-2">Confused how to write in "About Me" session? Let me help you.</p>
        <p className="text-[#86868B] text-center mb-8">Please enter your Gemini API key to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#86868B] mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] transition-all text-[15px] outline-none placeholder:text-[#86868B]/50"
              autoFocus
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              <strong>Data Privacy Warning:</strong> Your API key and profile data will not be saved anywhere. They are only kept in your browser's active session and will be cleared when you refresh the page.
            </p>
          </div>

          <button
            type="submit"
            disabled={!inputKey.trim()}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold transition-all shadow-lg ${
              !inputKey.trim()
                ? 'bg-[#E5E7EB] text-[#86868B] cursor-not-allowed shadow-none'
                : 'bg-[#1D1D1F] text-white hover:bg-black hover:shadow-xl active:scale-[0.98]'
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
