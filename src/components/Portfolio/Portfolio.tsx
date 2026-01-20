import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './Portfolio.module.css';

interface Project {
  id: number;
  title: string;
  category: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce платформа',
    category: 'Интернет-магазин с интеграцией платежей',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'Корпоративный портал',
    category: 'Внутренняя система для крупной компании',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: 'Мобильное приложение',
    category: 'Приложение для доставки еды',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    title: 'CRM система',
    category: 'Управление клиентами и продажами',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 5,
    title: 'Образовательная платформа',
    category: 'Онлайн-курсы и вебинары',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 6,
    title: 'Финтех приложение',
    category: 'Управление личными финансами',
    color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
];

export const Portfolio: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className={styles.portfolio} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Наши работы</h2>
          <p className={styles.subtitle}>
            Проекты, которыми мы гордимся
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.item} ${isVisible ? styles.visible : ''}`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                background: project.color,
              }}
            >
              <div className={styles.overlay}>
                <h3 className={styles.itemTitle}>{project.title}</h3>
                <p className={styles.itemCategory}>{project.category}</p>
                <button className={styles.viewButton}>
                  Смотреть проект
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
