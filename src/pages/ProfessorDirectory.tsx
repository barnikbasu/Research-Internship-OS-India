import { motion } from "motion/react";
import { GraduationCap, BookOpen, ExternalLink, Mail, Search, Award, TrendingUp, CheckCircle, MapPin, Globe, Paperclip } from "lucide-react";
import { PROFESSORS, UNIVERSITIES } from "@/src/data/mockData";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import EmailGeneratorModal from "@/src/components/EmailGeneratorModal";

export default function ProfessorDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProf, setSelectedProf] = useState<{name: string, lab: string} | null>(null);

  const filteredProfessors = PROFESSORS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.researchAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <EmailGeneratorModal 
        isOpen={!!selectedProf} 
        onClose={() => setSelectedProf(null)} 
        profName={selectedProf?.name || ""} 
        labName={selectedProf?.lab || ""} 
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Investigator Directory</h1>
          <p className="text-slate-500 mt-2 font-medium">Insights and profiles for researchers at top Indian labs.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, area, or institute..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProfessors.map((prof, i) => {
          const uni = UNIVERSITIES.find(u => u.id === prof.universityId);
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={prof.id}
              className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all group overflow-hidden relative"
            >
              {prof.verified && (
                <div className="absolute top-6 right-6 text-blue-600 bg-blue-50 p-1.5 rounded-full shadow-sm">
                  <CheckCircle size={14} />
                </div>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-100 p-0.5 overflow-hidden ring-4 ring-slate-50 group-hover:ring-blue-50 transition-all">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${prof.name}`} alt={prof.name} className="w-full h-full object-cover rounded-[0.85rem]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{prof.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-wider mt-1">
                    <MapPin size={12} className="text-slate-400" />
                    {uni?.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                 <div className="flex-1 text-center py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-lg font-black text-slate-900">{prof.hIndex}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">h-index</p>
                 </div>
                 <div className="flex-1 text-center py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-lg font-black text-slate-900">{(prof.citations/1000).toFixed(1)}k</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Citations</p>
                 </div>
                 <div className="flex-1 text-center py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-lg font-black text-slate-900">{prof.publications}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Papers</p>
                 </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-slate-600">
                  <BookOpen size={16} className="text-slate-400" />
                  <span className="text-sm font-medium">{prof.lab}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prof.researchAreas.map(area => (
                    <span key={area} className="px-3 py-1 bg-white border border-slate-100 text-[10px] font-bold text-slate-600 rounded-lg shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">{area}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedProf({ name: prof.name, lab: prof.lab })}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-[1.25rem] text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-100 flex items-center justify-center gap-2"
                >
                  <Mail size={14} />
                  AI Cold Email
                </button>
                <button className="px-5 py-4 bg-white border border-slate-200 text-slate-600 rounded-[1.25rem] hover:bg-slate-50 transition-all flex items-center justify-center">
                  <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
