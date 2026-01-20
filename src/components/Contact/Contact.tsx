import React, { FC, useRef, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useUnit } from 'effector-react';
import { submitFormFx, $isLoading, $formSubmitted, $formError, resetForm, ContactFormData } from '../../store';
import styles from './Contact.module.css';

export const Contact: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, formSubmitted, formError] = useUnit([$isLoading, $formSubmitted, $formError]);
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitFormFx(formData);
  };

  const handleReset = () => {
    resetForm();
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Свяжитесь с нами</h2>
          <p className={styles.subtitle}>
            Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в течение 24 часов
          </p>
        </div>

        <div className={`${styles.formWrapper} ${isVisible ? styles.visible : ''}`}>
          {formSubmitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Спасибо за заявку!</h3>
              <p>Мы свяжемся с вами в ближайшее время.</p>
              <button className={styles.resetButton} onClick={handleReset}>
                Отправить ещё
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="Расскажите о вашем проекте..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {formError && (
                <div className={styles.errorMessage}>
                  {formError}
                </div>
              )}

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  'Отправить заявку'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
