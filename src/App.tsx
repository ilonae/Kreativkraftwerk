import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Projects from './pages/Projects';
import CollectiveNetwork from './pages/CollectiveNetwork';
import Approach from './pages/Approach';
import Contact from './pages/Contact';
import About from './pages/About';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [activeTab, setActiveTab] = useState('projects');

  const renderPage = () => {
    switch (activeTab) {
      case 'projects':           return <Projects />;
      case 'collective-network': return <CollectiveNetwork />;
      case 'approach':           return <Approach />;
      case 'contact':            return <Contact />;
      case 'about':              return <About />;
      default:                   return <Projects />;
    }
  };

  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-white text-kkw-black">
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {renderPage()}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
