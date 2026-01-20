import React, { FC } from 'react';
import { useSmoothScroll } from '../../hooks';
import styles from './Hero.module.css';

export const Hero: FC = () => {
  const { scrollToSection } = useSmoothScroll();

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.pattern}></div>
        <div className={styles.gradient}></div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>Создаём цифровое</span>
          <span className={styles.titleLine}>будущее вместе</span>
        </h1>
        
        <p className={styles.subtitle}>
          Мы разрабатываем инновационные решения, которые помогают 
          бизнесу расти и развиваться в цифровую эпоху
        </p>
        
        <div className={styles.buttons}>
          <button 
            className={styles.btnPrimary}
            onClick={() => scrollToSection('contact')}
          >
            Начать проект
          </button>
          <button 
            className={styles.btnSecondary}
            onClick={() => scrollToSection('about')}
          >
            Узнать больше
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>150+</span>
            <span className={styles.statLabel}>Проектов</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Клиентов</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5</span>
            <span className={styles.statLabel}>Лет опыта</span>
          </div>
        </div>
      </div>

      <div 
        className={styles.scrollIndicator} 
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Прокрутите вниз</span>
      </div>
    </section>
  );
};

export default Hero;
