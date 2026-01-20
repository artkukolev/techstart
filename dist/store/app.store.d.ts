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
export declare const toggleMenu: import("effector").EventCallable<void>;
export declare const closeMenu: import("effector").EventCallable<void>;
export declare const setActiveSection: import("effector").EventCallable<string>;
export declare const setScrolled: import("effector").EventCallable<boolean>;
export declare const resetForm: import("effector").EventCallable<void>;
export declare const submitFormFx: import("effector").Effect<ContactFormData, void, Error>;
export declare const $isMenuOpen: import("effector").StoreWritable<boolean>;
export declare const $activeSection: import("effector").StoreWritable<string>;
export declare const $isScrolled: import("effector").StoreWritable<boolean>;
export declare const $isLoading: import("effector").StoreWritable<boolean>;
export declare const $formSubmitted: import("effector").StoreWritable<boolean>;
export declare const $formError: import("effector").StoreWritable<string | null>;
export interface AnimationState {
    visibleSections: Set<string>;
}
export declare const addVisibleSection: import("effector").EventCallable<string>;
export declare const removeVisibleSection: import("effector").EventCallable<string>;
export declare const $visibleSections: import("effector").StoreWritable<Set<string>>;
//# sourceMappingURL=app.store.d.ts.map