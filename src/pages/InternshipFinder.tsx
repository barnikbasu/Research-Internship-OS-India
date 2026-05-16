import { motion } from "motion/react";
import { Search, Filter, MapPin, Calendar, IndianRupee, Briefcase, GraduationCap, CheckCircle, TrendingUp, Sparkles, BookOpen, Clock } from "lucide-react";
import { INTERNSHIPS, PROFESSORS, UNIVERSITIES } from "@/src/data/mockData";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export default function InternshipFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");

  const domains = ["All", "AI/ML", "Robotics", "Bioinformatics", "Systems", "Physics"];

  const filteredInternships = INTERNSHIPS.filter(int => {
    const matchesSearch = int.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          int.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === "All" || int.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Active Opportunities</h1>
          <p className="text-slate-500 flex items-center gap-2 mt-1 font-medium">
            Discover verified internship and assistantship roles across the country
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input 
              type="text" 
              placeholder="Search domain or title..." 
              className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="internship-search"
             />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 noscroll">
        {domains.map(domain => (
          <button
            key={domain}
            onClick={() => setSelectedDomain(domain)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              selectedDomain === domain 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
            )}
          >
            {domain}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredInternships.map((internship, index) => {
            const prof = PROFESSORS.find(p => p.id === internship.professorId);
            const uni = UNIVERSITIES.find(u => u.id === internship.universityId);
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={internship.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-100 transition-all group overflow-hidden relative"
              >
                {internship.verified && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-bl-2xl border-l border-b border-green-100 flex items-center gap-1">
                    <CheckCircle size={10} />
                    Verified Opening
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pt-2">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                      <GraduationCap className="text-blue-600 w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{internship.title}</h3>
                      <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                        {prof?.name} • {uni?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase">{internship.mode}</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase">{internship.domain}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <IndianRupee size={16} className="text-slate-400" />
                    <span className="text-xs font-medium">{internship.stipend}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-xs font-medium">{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <TrendingUp size={16} className="text-slate-400" />
                    <span className="text-xs font-medium">Diff: {internship.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-xs font-medium">Until: {internship.deadline}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {internship.requirements.map(req => (
                    <span key={req} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] rounded-md">{req}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + index}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      +12
                    </div>
                    <span className="ml-4 text-[10px] text-slate-400 font-medium">Applicants reached</span>
                  </div>
                  <Link 
                    to={`/internships/${internship.id}`}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
              <TrendingUp className="mb-4 w-8 h-8 text-blue-200" />
              <h2 className="text-xl font-bold mb-2">Research Profile Alignment</h2>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed font-medium">
                Sync your project portfolio to identify which research groups are most compatible with your current skill set.
              </p>
              <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                Analyze My Fit
              </button>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-orange-500" />
                Trending Research Hubs
              </h3>
              <div className="space-y-4">
                {[
                  { name: "IIT Madras", count: 42, growth: "+15%" },
                  { name: "IISc Bangalore", count: 31, growth: "+8%" },
                  { name: "IIT Delhi", count: 28, growth: "+12%" },
                ].map((hub, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{hub.name}</p>
                      <p className="text-xs text-slate-500">{hub.count} new openings</p>
                    </div>
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">{hub.growth}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                <BookOpen size={16} className="text-blue-500" />
                Featured Publication
              </h3>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">NeurIPS 2026</p>
                <h4 className="text-xs font-bold text-slate-900 mb-2 leading-tight">Quantization-Aware Training for Large Vision Models</h4>
                <p className="text-[10px] text-slate-500">Dr. Sharma's team just published a breakthrough.</p>
                <button className="w-full mt-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-slate-50">
                  Read Digest
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
