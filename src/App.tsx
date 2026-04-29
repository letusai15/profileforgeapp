import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  User,
  Target,
  RotateCcw,
  Copy,
  Check,
  Linkedin,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { generateBios, BioOption } from './lib/gemini';
import Logo from "./Logo";

export default function App() {
  const [profileData, setProfileData] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bios, setBios] = useState<BioOption[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!profileData.trim()) return;

    setIsGenerating(true);
    try {
      const results = await generateBios(profileData, careerGoals);
      setBios(results);
    } catch (error) {
      console.error(error);
      alert('Failed to generate bios. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setProfileData('');
    setCareerGoals('');
    setBios([]);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] font-sans selection:bg-[#0A66C2]/10">
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="bg-[#0A66C2] p-1.5 rounded-sm">
              <Linkedin className="w-5 h-5 text-white" />
            </div> */}

            <Logo />
            {/* <span className="font-semibold tracking-tight text-lg hidden sm:block h-8">ProfileForge</span> */}
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-medium uppercase tracking-widest text-[#86868B] hover:text-[#1D1D1F] transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-8">
            <header className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]"
              >
                Craft your <br />
                <span className="text-[#0A66C2]">perfect narrative.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-[#86868B]"
              >
                Tell us about your journey and goals. We'll architect a 'About' section that converts views into opportunities.
              </motion.p>
            </header>

            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#86868B]">
                  <User className="w-3.5 h-3.5" />
                  Experience & Skills (Paste Profile)
                </label>
                <textarea
                  value={profileData}
                  onChange={(e) => setProfileData(e.target.value)}
                  placeholder="Paste your existing profile info, resume bullet points, or career highlights here... Use your LinkedIn or CV"
                  className="w-full h-48 p-4 bg-white border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] transition-all resize-none text-[15px] leading-relaxed outline-none shadow-sm placeholder:text-[#86868B]/50"
                  id="profile-input"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#86868B]">
                  <Target className="w-3.5 h-3.5" />
                  Your Career Goals
                </label>
                <textarea
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                  placeholder="e.g. Pivot to Product Management, attract recruiters in SaaS, or build a personal brand for consulting..."
                  className="w-full h-24 p-4 bg-white border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] transition-all resize-none text-[15px] leading-relaxed outline-none shadow-sm placeholder:text-[#86868B]/50"
                  id="goals-input"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !profileData.trim()}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all shadow-lg ${isGenerating || !profileData.trim()
                  ? 'bg-[#E5E7EB] text-[#86868B] cursor-not-allowed shadow-none'
                  : 'bg-[#1D1D1F] text-white hover:bg-black hover:shadow-xl active:scale-[0.98]'
                  }`}
                id="generate-button"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Architecting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#0A66C2]" />
                    Build My Bio
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {bios.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold tracking-tight">Generated Versions</h2>
                    <span className="text-xs font-medium text-[#86868B] flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Ready to use
                    </span>
                  </div>

                  {bios.map((bio, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white border border-[#E5E7EB] rounded-3xl p-8 hover:border-[#0A66C2]/30 transition-all hover:shadow-xl shadow-sm"
                      id={`bio-variant-${index}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-[#F8F9FA] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#0A66C2] border border-[#0A66C2]/10">
                          {bio.tone}
                        </span>
                        <button
                          onClick={() => handleCopy(bio.content, index)}
                          className="p-2.5 bg-[#F8F9FA] rounded-xl hover:bg-[#0A66C2] hover:text-white transition-all group/btn"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-[16px] leading-[1.6] text-[#424245] whitespace-pre-wrap italic group-hover:not-italic transition-all">
                          {bio.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#E5E7EB] rounded-[40px] text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#E5E7EB]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-[#1D1D1F]">No bios generated yet</p>
                    <p className="text-sm text-[#86868B] max-w-xs">
                      Enter your details on the left to see three tailored versions of your professional summary.
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col gap-2 w-full max-w-xs">
                    <div className="h-4 bg-[#F8F9FA] rounded-full w-full animate-pulse" />
                    <div className="h-4 bg-[#F8F9FA] rounded-full w-3/4 animate-pulse mx-auto" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-12 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            {/* <Linkedin className="w-4 h-4" /> */}
            <span className="text-sm font-medium tracking-tight">Build Your About</span>
          </div>
          {/* <div className="flex gap-8 text-[13px] font-medium text-[#86868B]">
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Career Tips</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Support</a>
          </div> */}
          <p className="text-[13px] text-[#86868B]">© 2026: <a href="https://www.linkedin.com/in/dmonalisa" target="_blank" className="hover:text-[#1D1D1F] transition-colors">Monalisa Das</a></p>
        </div>
      </footer>
    </div>
  );
}
