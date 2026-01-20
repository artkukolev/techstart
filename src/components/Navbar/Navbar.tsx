import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import { $isMenuOpen, $isScrolled, $activeSection, toggleMenu, closeMenu } from '../../store';
import { useSmoothScroll } from '../../hooks';
import styles from './Navbar.module.css';

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'testimonials', label: 'Отзывы' },
  { id: 'contact', label: 'Контакты' },
];

export const Navbar: FC = () => {
  const [isMenuOpen, isScrolled, activeSection] = useUnit([$isMenuOpen, $isScrolled, $activeSection]);
  const { scrollToSection } = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  const handleLogoClick = () => {
    scrollToSection('hero');
    closeMenu();
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button 
          className={styles.logo} 
          onClick={handleLogoClick}
          aria-label="На главную"
        >
          TechStart
        </button>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => toggleMenu()}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.mobileNavLinks}>
            {navLinks.map((link, index) => (
              <li 
                key={link.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className={styles.overlay} 
            onClick={() => closeMenu()}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
