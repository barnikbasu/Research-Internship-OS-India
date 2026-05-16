import { motion } from "motion/react";
import { GraduationCap, ArrowRight, Sparkles, Database, Mail, Map, Users, Globe, BookOpen, Layers, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">ResearchOS <span className="text-blue-600">India</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#institutes" className="hover:text-blue-600 transition-colors">Institutes</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Success Stories</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Login</Link>
          <Link to="/dashboard" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md shadow-slate-200 flex items-center gap-2 group">
            Get Started
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-xs font-semibold mb-8"
        >
          <Sparkles size={14} />
          <span>The Definitive Portal for Research Careers in India</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8"
        >
          Made in India. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Built for Future Scholars.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-12"
        >
          Connect with leading researchers at India’s premier institutions. Leverage data-driven insights to find the right lab and build a world-class academic profile.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/internships" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all text-lg">
            Explore Placements
            <ArrowRight size={20} />
          </Link>
          <Link to="/mentor" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold border border-slate-200 shadow-sm hover:border-slate-300 transition-all text-lg">
            Connect with Experts
          </Link>
        </motion.div>

        {/* Floating Features Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-2"
        >
          <div className="bg-slate-50 w-full h-full rounded-[1.25rem] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Search, title: 'Deep Search', desc: 'Find specialized openings in labs across India using our research taxonomy.' },
                { icon: Mail, title: 'Smart Outreach', desc: 'Generate paper-targeted outreach messages that get noticed by busy researchers.' },
                { icon: Map, title: 'Lab Mapping', desc: 'Explore research ecosystems from IISc to TIFR through an interactive map.' }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-24 px-8 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Institutes', value: '450+' },
            { label: 'Network Points', value: '12k+' },
            { label: 'Placements', value: '800+' },
            { label: 'Matches', value: '50k+' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-5xl font-black mb-2 text-blue-400">{stat.value}</p>
              <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Everything a Researcher Needs</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">From discovery to publication, we provide the ultimate operating system for your academic journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "Precision Matching", desc: "Our engine aligns your unique skills and project history with a professor's research trajectory." },
            { icon: Layers, title: "Lab Intelligence", desc: "Follow targeted research groups and stay updated on new project funding and hiring cycles." },
            { icon: Database, title: "Verified Listings", desc: "We host direct lab openings vetted through academic verification processes." },
            { icon: BookOpen, title: "Insight Summaries", desc: "Quickly synthesize key findings from complex papers to prepare for technical interviews." },
            { icon: Users, title: "Scholarly Network", desc: "Collaborate with 50k+ research students globally, sharing lab experiences and reviews." },
            { icon: Globe, title: "Project Portfolio", desc: "Build a professional academic presence in minutes with integrated documentation." },
          ].map((feature, i) => (
            <div key={i} className="group p-8 bg-white rounded-3xl border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-50 cursor-pointer">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[2.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to build your <br /> research career?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/dashboard" className="w-full sm:w-auto bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
                Join ResearchOS Free
              </Link>
              <Link to="/professors" className="w-full sm:w-auto bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg border border-blue-500 hover:bg-blue-800 transition-all">
                Hire Interns
              </Link>
            </div>
          </div>
          {/* Abstract Bg decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">ResearchOS</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">Empowering Indian students to reach the world's best research labs. Built with love by researchers, for researchers.</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                <Globe size={16} />
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                <Users size={16} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
              <ul className="text-sm text-slate-500 space-y-3">
                <li className="hover:text-blue-600 cursor-pointer">Internships</li>
                <li className="hover:text-blue-600 cursor-pointer">Professors</li>
                <li className="hover:text-blue-600 cursor-pointer">Roadmaps</li>
                <li className="hover:text-blue-600 cursor-pointer">Paper IQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Community</h4>
              <ul className="text-sm text-slate-500 space-y-3">
                <li className="hover:text-blue-600 cursor-pointer">Discussion</li>
                <li className="hover:text-blue-600 cursor-pointer">Mentors</li>
                <li className="hover:text-blue-600 cursor-pointer">Success Stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Support</h4>
              <ul className="text-sm text-slate-500 space-y-3">
                <li className="hover:text-blue-600 cursor-pointer">Terms</li>
                <li className="hover:text-blue-600 cursor-pointer">Privacy</li>
                <li className="hover:text-blue-600 cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4 text-xs font-medium text-slate-400">
           <p>© 2026 ResearchOS India. All rights reserved.</p>
           <p>Made in 🇮🇳 for the Global Research Community.</p>
        </div>
      </footer>
    </div>
  );
}
