import React, { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  Navbar,
  Hero,
  About,
  Services,
  Portfolio,
  Testimonials,
  Contact,
  Footer,
} from './components';
import { useScrollPosition } from './hooks';
import { $isMenuOpen } from './store';
import './styles/global.css';

export const App: FC = () => {
  const isMenuOpen = useUnit($isMenuOpen);
  
  // Initialize scroll position tracking
  useScrollPosition();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
