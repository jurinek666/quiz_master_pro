
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideLayoutPaths = ['/inbox', '/profile'];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  const MainWrapper = shouldHideLayout ? ({ children }: { children: React.ReactNode }) => <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-2xl">{children}</div> : Layout;

  return (
    <MainWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/team" element={<Team />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </MainWrapper>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
