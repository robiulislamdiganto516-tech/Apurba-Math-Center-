
import React, { useState, useEffect } from 'react';
import { Screen } from './types';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChapterScreen from './screens/ChapterScreen';
import FormulaScreen from './screens/FormulaScreen';
import QuizScreen from './screens/QuizScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import AISolverScreen from './screens/AISolverScreen';
import HelpScreen from './screens/HelpScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');
  const [user, setUser] = useState<{ name: string; isLoggedIn: boolean } | null>(null);

  useEffect(() => {
    if (currentScreen === 'SPLASH') {
      const timer = setTimeout(() => {
        setCurrentScreen('LOGIN');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (name: string) => {
    setUser({ name, isLoggedIn: true });
    setCurrentScreen('HOME');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('LOGIN');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH':
        return <SplashScreen />;
      case 'LOGIN':
        return <LoginScreen onLogin={handleLogin} onGuest={() => handleLogin('Guest')} />;
      case 'HOME':
        return <HomeScreen userName={user?.name || 'Student'} onNavigate={setCurrentScreen} />;
      case 'CHAPTERS':
        return <ChapterScreen onBack={() => setCurrentScreen('HOME')} />;
      case 'FORMULAS':
        return <FormulaScreen onBack={() => setCurrentScreen('HOME')} />;
      case 'QUIZ':
        return <QuizScreen onBack={() => setCurrentScreen('HOME')} />;
      case 'PROGRESS':
        return <ProgressScreen onBack={() => setCurrentScreen('HOME')} />;
      case 'PROFILE':
        return <ProfileScreen onBack={() => setCurrentScreen('HOME')} onLogout={handleLogout} />;
      case 'AI_SOLVER':
        return <AISolverScreen onBack={() => setCurrentScreen('HOME')} />;
      case 'HELP':
        return <HelpScreen onBack={() => setCurrentScreen('HOME')} />;
      default:
        return <HomeScreen userName={user?.name || 'Student'} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden bg-white">
      {renderScreen()}
    </div>
  );
};

export default App;
