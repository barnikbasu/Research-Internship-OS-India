import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Send, Copy, Check, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { engineService } from "@/src/lib/utils";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profName: string;
  labName: string;
}

export default function EmailGeneratorModal({ isOpen, onClose, profName, labName }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const prompt = `Draft a highly professional and researchers-centric outreach message to ${profName} regarding their work in the ${labName}. Highlight deep technical interest, mention specific research milestones, and request an opportunity to contribute. Maintain a sophisticated academic tone.`;
      const response = await engineService('/api/engine/generate', { prompt });
      setEmail(response.result);
    } catch (err) {
      setEmail("Service currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Mail size={20} />
                </div>
                <div>
                   <h2 className="font-bold text-slate-900">Personalized Outreach Engine</h2>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Recipient: {profName}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {!email && !loading ? (
                <div className="text-center py-12">
                   <TrendingUp size={48} className="text-slate-200 mx-auto mb-4" />
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Build Your Connection</h3>
                   <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">We'll help you synthesize your research background into a compelling message for this laboratory.</p>
                   <button 
                    onClick={generateEmail}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-100 hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
                   >
                     Draft Message
                     <TrendingUp size={16} />
                   </button>
                </div>
              ) : loading ? (
                <div className="text-center py-12">
                   <Loader2 size={48} className="text-blue-600 animate-spin mx-auto mb-4" />
                   <p className="text-sm font-bold text-slate-900">Analyzing papers & drafting...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-serif text-slate-800 whitespace-pre-wrap text-sm leading-relaxed">
                    {email}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={copyToClipboard}
                      className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                    >
                      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      {copied ? "Copied!" : "Copy to Clipboard"}
                    </button>
                    <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                      <Send size={18} />
                      Send via Outlook
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 font-medium italic">Tip: Don't forget to attach your resume before hitting send.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
