import { createStore, createEvent, createEffect, sample } from 'effector';

// Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AppState {
  isMenuOpen: boolean;
  activeSection: string;
  isScrolled: boolean;
  isLoading: boolean;
  formSubmitted: boolean;
  formError: string | null;
}

// Events
export const toggleMenu = createEvent();
export const closeMenu = createEvent();
export const setActiveSection = createEvent<string>();
export const setScrolled = createEvent<boolean>();
export const resetForm = createEvent();

// Effects
export const submitFormFx = createEffect<ContactFormData, void, Error>(
  async (data: ContactFormData) => {
    // Симуляция отправки формы
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    // В реальном приложении здесь был бы API запрос
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Failed to submit form');
  }
);

// Stores
export const $isMenuOpen = createStore<boolean>(false)
  .on(toggleMenu, (state) => !state)
  .on(closeMenu, () => false);

export const $activeSection = createStore<string>('hero')
  .on(setActiveSection, (_, section) => section);

export const $isScrolled = createStore<boolean>(false)
  .on(setScrolled, (_, scrolled) => scrolled);

export const $isLoading = createStore<boolean>(false)
  .on(submitFormFx.pending, (_, pending) => pending);

export const $formSubmitted = createStore<boolean>(false)
  .on(submitFormFx.done, () => true)
  .on(resetForm, () => false);

export const $formError = createStore<string | null>(null)
  .on(submitFormFx.failData, (_, error) => error.message)
  .on(submitFormFx, () => null)
  .on(resetForm, () => null);

// Close menu when section changes
sample({
  clock: setActiveSection,
  target: closeMenu,
});

// Animation store for intersection observer
export interface AnimationState {
  visibleSections: Set<string>;
}

export const addVisibleSection = createEvent<string>();
export const removeVisibleSection = createEvent<string>();

export const $visibleSections = createStore<Set<string>>(new Set())
  .on(addVisibleSection, (state, section) => {
    const newSet = new Set(state);
    newSet.add(section);
    return newSet;
  })
  .on(removeVisibleSection, (state, section) => {
    const newSet = new Set(state);
    newSet.delete(section);
    return newSet;
  });
