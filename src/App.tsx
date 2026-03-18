import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubmitStory from './pages/SubmitStory';
import AdminDashboard from './pages/AdminDashboard';
import { initialCases } from './data/mockData';
import type { Case } from './data/mockData';

// Expose minimal context for demo state
interface AppContextType {
  cases: Case[];
  addCase: (newCase: Case) => void;
  updateVote: (caseId: string, type: 'served' | 'denied') => void;
}

export const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

function App() {
  const [cases, setCases] = useState<Case[]>(initialCases);

  const addCase = (newCase: Case) => {
    setCases(prev => [newCase, ...prev]);
  };

  const updateVote = (caseId: string, type: 'served' | 'denied') => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          votes: {
            ...c.votes,
            [type]: c.votes[type] + 1
          }
        };
      }
      return c;
    }));
  };

  return (
    <AppContext.Provider value={{ cases, addCase, updateVote }}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col tracking-tight">
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/submit" element={<SubmitStory />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <footer className="border-t border-slate-800 py-8 text-center text-slate-500 mt-auto">
            <p className="font-semibold text-sm">न्याय खै? (Where is Justice?)</p>
            <p className="text-xs mt-2 opacity-75">A public sentiment tracker for unresolved cases.</p>
          </footer>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
