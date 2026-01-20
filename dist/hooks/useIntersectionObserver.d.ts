interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
}
export declare const useIntersectionObserver: (sectionId: string, options?: UseIntersectionObserverOptions) => {
    ref: import("react").RefObject<HTMLElement>;
    isVisible: boolean;
};
export declare const useScrollAnimation: (delay?: number) => {
    ref: import("react").RefObject<HTMLElement>;
    shouldAnimate: boolean;
};
export {};
//# sourceMappingURL=useIntersectionObserver.d.ts.map