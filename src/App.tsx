import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import InternshipFinder from "./pages/InternshipFinder";
import ProfessorDirectory from "./pages/ProfessorDirectory";
import ResearchMentor from "./pages/ResearchMentor";
import { Sidebar, Topbar } from "./components/Layout";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AuthenticatedLayout><Dashboard /></AuthenticatedLayout>} />
        <Route path="/internships" element={<AuthenticatedLayout><InternshipFinder /></AuthenticatedLayout>} />
        <Route path="/professors" element={<AuthenticatedLayout><ProfessorDirectory /></AuthenticatedLayout>} />
        <Route path="/mentor" element={<AuthenticatedLayout><ResearchMentor /></AuthenticatedLayout>} />
        {/* Placeholder for other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
