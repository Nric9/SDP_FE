import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-background, #fff)',
              color: 'var(--toast-text, #374151)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              padding: '0.75rem 1rem',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#ECFDF5',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FEF2F2',
              },
            },
          }}
        />
        
        <Header />
        <main className="container mx-auto py-6">
          <Dashboard />
        </main>
        
        <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Forest Fire Detection System • All rights reserved</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;