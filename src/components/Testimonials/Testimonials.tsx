import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Отличная команда профессионалов! Сделали сайт точно в срок и даже лучше, чем мы ожидали. Рекомендую всем!',
    author: 'Алексей Козлов',
    position: 'CEO, TechCorp',
    initials: 'АК',
  },
  {
    id: 2,
    text: 'Работаем с TechStart уже третий год. Всегда качественно, быстро и с пониманием наших потребностей.',
    author: 'Мария Смирнова',
    position: 'Директор, StyleShop',
    initials: 'МС',
  },
  {
    id: 3,
    text: 'Благодаря новому сайту наши продажи выросли на 40%. Спасибо команде за профессиональный подход!',
    author: 'Дмитрий Петров',
    position: 'Владелец, FoodDelivery',
    initials: 'ДП',
  },
];

export const Testimonials: FC = () => {
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
    <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Отзывы клиентов</h2>
          <p className={styles.subtitle}>
            Что говорят о нас наши клиенты
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${styles.card} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={styles.quote}>"</div>
              <p className={styles.text}>{testimonial.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.initials}
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testimonial.author}</h4>
                  <span className={styles.authorPosition}>{testimonial.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
