import { motion } from "motion/react";
import { Send, Bot, User, Sparkles, Paperclip, Loader2, BookOpen, Mail, Terminal, GraduationCap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { engineService } from "@/src/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ResearchMentor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome! I'm your ResearchOS Expert Guide. I can help you identify high-impact internships at top Indian institutes, synthesize research topics, or structure your outreach. How can I help you move your research career forward today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await engineService('/api/engine/generate', { 
        prompt: input,
        context: "You are a senior academic advisor with deep expertise in the Indian research ecosystem (IITs, IISc, TIFR). Provide actionable, data-driven, and career-focused advice for research placement and academic development. Keep responses structured and analytical. Use professional markdown."
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.result }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-indigo-600 border border-slate-200'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <GraduationCap size={20} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                 <Loader2 className="animate-spin text-indigo-600" size={20} />
                 <span className="text-sm font-medium text-slate-500">Processing...</span>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-12 left-0 flex gap-2">
            {[
              { label: 'Draft Cold Email', icon: Mail },
              { label: 'Analyze Paper', icon: BookOpen },
              { label: 'Roadmap AI/ML', icon: Terminal },
            ].map((tool, i) => (
              <button 
                key={i}
                onClick={() => setInput(prev => `${prev}${tool.label}: `)}
                className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:border-blue-400 transition-all shadow-sm flex items-center gap-1.5"
              >
                <tool.icon size={12} className="text-blue-500" />
                {tool.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea 
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about research. e.g., 'How to apply to IIT Bombay for a summer internship?'"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-16 focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">ResearchOS Insights are provided for guidance; always cross-verify with official lab documentation and university portals.</p>
        </div>
      </div>
    </div>
  );
}
