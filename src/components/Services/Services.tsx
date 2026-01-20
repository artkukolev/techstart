import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './Services.module.css';

interface Service {
  title: string;
  description: string;
  price: string;
  period?: string;
}

const services: Service[] = [
  {
    title: 'Веб-разработка',
    description: 'Создание современных сайтов и веб-приложений любой сложности',
    price: 'от 50 000 ₽',
  },
  {
    title: 'Мобильные приложения',
    description: 'Разработка нативных и кроссплатформенных мобильных приложений',
    price: 'от 150 000 ₽',
  },
  {
    title: 'UI/UX Дизайн',
    description: 'Проектирование удобных и красивых интерфейсов для ваших продуктов',
    price: 'от 30 000 ₽',
  },
  {
    title: 'SEO продвижение',
    description: 'Комплексное продвижение сайтов в поисковых системах',
    price: 'от 25 000 ₽',
    period: '/мес',
  },
];

export const Services: FC = () => {
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
    <section id="services" className={styles.services} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Наши услуги</h2>
          <p className={styles.subtitle}>
            Полный спектр услуг для вашего цифрового присутствия
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`${styles.card} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <div className={styles.price}>
                {service.price}
                {service.period && <span className={styles.period}>{service.period}</span>}
              </div>
              <button className={styles.cardButton}>Подробнее</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
