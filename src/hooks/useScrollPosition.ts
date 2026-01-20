import { useEffect, useCallback } from 'react';
import { setScrolled, setActiveSection } from '../store';

export const useScrollPosition = () => {
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    
    // Update navbar background
    setScrolled(scrollY > 50);
    
    // Update active section
    const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const offset = window.innerHeight * 0.3;
        
        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);
};

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return { scrollToSection };
};
