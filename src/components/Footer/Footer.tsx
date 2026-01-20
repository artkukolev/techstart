import React, { FC } from 'react';
import { useSmoothScroll } from '../../hooks';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const navLinks: FooterLink[] = [
  { label: 'О нас', href: 'about' },
  { label: 'Услуги', href: 'services' },
  { label: 'Портфолио', href: 'portfolio' },
  { label: 'Контакты', href: 'contact' },
];

const socialLinks: SocialLink[] = [
  { label: 'VK', href: '#', icon: 'VK' },
  { label: 'Telegram', href: '#', icon: 'TG' },
  { label: 'YouTube', href: '#', icon: 'YT' },
];

export const Footer: FC = () => {
  const { scrollToSection } = useSmoothScroll();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand Section */}
          <div className={styles.section}>
            <h3 className={styles.logo}>TechStart</h3>
            <p className={styles.description}>
              Создаём цифровые продукты, которые меняют мир к лучшему. 
              Инновации, качество, результат.
            </p>
          </div>

          {/* Navigation */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Навигация</h4>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    className={styles.link}
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Контакты</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>📍</span>
                Москва, ул. Примерная, 123
              </li>
              <li>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+79991234567" className={styles.contactLink}>
                  +7 (999) 123-45-67
                </a>
              </li>
              <li>
                <span className={styles.contactIcon}>✉️</span>
                <a href="mailto:info@techstart.ru" className={styles.contactLink}>
                  info@techstart.ru
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Социальные сети</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>© {currentYear} TechStart. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
