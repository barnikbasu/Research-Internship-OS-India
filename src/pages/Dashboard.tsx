import { motion } from "motion/react";
import { LayoutDashboard, Briefcase, GraduationCap, Users, FileText, CheckCircle, Clock, Zap, Target, TrendingUp, Sparkles, MapPin } from "lucide-react";
import { INTERNSHIPS, PROFESSORS } from "@/src/data/mockData";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { label: "Applied", value: 4, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Interviews", value: 1, icon: Target, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Shortlisted", value: 2, icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Accepted", value: 0, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Aryan</h1>
          <p className="text-slate-500 font-medium tracking-tight">Student at IIT Kharagpur  •  3rd Year B.Tech CSE</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">Download Research CV</button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all">Update Portfolio</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Applications */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Application Pipeline</h2>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { lab: "Intelligent Systems Lab", prof: "Dr. Sharma", status: "Shortlisted", date: "2 days ago", icon: Sparkles },
                { lab: "RoboDynamics Lab", prof: "Dr. Venkatesh", status: "Interview Scheduled", date: "Next Monday", icon: Target },
                { lab: "BioCompute Group", prof: "Dr. Mehra", status: "Applied", date: "1 week ago", icon: Clock },
              ].map((app, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <app.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.lab}</h4>
                      <p className="text-xs text-slate-500 font-medium">{app.prof} • IIT Delhi</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      app.status.includes('Interview') ? 'bg-amber-50 text-amber-600' : 
                      app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {app.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Insights */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <TrendingUp size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Placement Insight</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Focus Recommendation</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-lg">
                  Based on current publications and lab funding patterns, you are highly competitive for advanced "Distributed Systems" roles.
                </p>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                      <p className="text-xl font-black">92%</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Systems Fit</p>
                   </div>
                   <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                      <p className="text-xl font-black">78%</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">AI/ML Fit</p>
                   </div>
                </div>
             </div>
             <div className="absolute top-0 right-0 p-8">
                <TrendingUp size={120} className="text-white/5" />
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Strength */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              Profile Strength
              <span className="text-blue-600 text-xs px-2 py-1 bg-blue-50 rounded-lg">Level 4</span>
            </h3>
            <div className="relative h-2 bg-slate-100 rounded-full mb-6">
               <div className="absolute top-0 left-0 h-full w-[75%] bg-blue-600 rounded-full"></div>
            </div>
            <ul className="space-y-4">
              {[
                { task: "Add publication data", completed: false },
                { task: "Connect GitHub", completed: true },
                { task: "Upload 3rd Year Transcript", completed: true },
                { task: "Complete Research Profile", completed: true },
              ].map((task, i) => (
                <li key={i} className="flex items-center justify-between text-xs font-medium">
                  <span className={task.completed ? "text-slate-400" : "text-slate-700"}>{task.task}</span>
                  {task.completed ? <CheckCircle size={14} className="text-green-500" /> : <div className="w-3.5 h-3.5 border border-slate-300 rounded-full"></div>}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Professors */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Top Lab Recommendations</h3>
            <div className="space-y-4">
              {PROFESSORS.slice(0, 2).map((prof) => (
                <div key={prof.id} className="p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-colors">
                  <h4 className="text-xs font-bold text-slate-900">{prof.name}</h4>
                  <p className="text-[10px] text-slate-500 mb-3">{prof.lab} • {prof.department}</p>
                  <div className="flex gap-2">
                    {prof.researchAreas.slice(0, 2).map(area => (
                       <span key={area} className="text-[8px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded shadow-sm">{area}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">Explore All Professors</button>
          </div>
        </div>
      </div>
    </div>
  );
}
