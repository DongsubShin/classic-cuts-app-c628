import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<LandingPage />} /> {/* Placeholder for booking flow */}
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<AdminDashboard />} />
          <Route path="/admin/commission" element={<AdminDashboard />} />
          <Route path="/admin/sms" element={<AdminDashboard />} />
          
          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;