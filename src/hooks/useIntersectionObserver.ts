import { useEffect, useRef, useState, useCallback } from 'react';
import { addVisibleSection, removeVisibleSection } from '../store';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  sectionId: string,
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (triggerOnce && hasTriggered) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          addVisibleSection(sectionId);
          if (triggerOnce) setHasTriggered(true);
        } else if (!triggerOnce) {
          setIsVisible(false);
          removeVisibleSection(sectionId);
        }
      });
    },
    [sectionId, triggerOnce, hasTriggered]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return { ref, isVisible };
};

export const useScrollAnimation = (delay: number = 0) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setShouldAnimate(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return { ref, shouldAnimate };
};
