import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './About.module.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🚀',
    title: 'Быстрая разработка',
    description: 'Используем современные технологии и методологии для быстрой и качественной разработки ваших проектов',
  },
  {
    icon: '💡',
    title: 'Инновационный подход',
    description: 'Применяем передовые решения и следим за трендами, чтобы ваш продукт был на шаг впереди конкурентов',
  },
  {
    icon: '🎯',
    title: 'Фокус на результат',
    description: 'Каждый проект направлен на достижение ваших бизнес-целей и увеличение прибыли',
  },
];

export const About: FC = () => {
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
    <section 
      id="about" 
      className={styles.about} 
      ref={sectionRef}
    >
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Почему выбирают нас</h2>
          <p className={styles.subtitle}>
            Мы объединяем креативность и технологии для создания уникальных цифровых продуктов
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`${styles.card} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
