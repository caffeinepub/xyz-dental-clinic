import { useEffect, useRef } from "react";

export function useGSAPScrollReveal<
  T extends HTMLElement = HTMLDivElement,
>(options?: {
  threshold?: number;
  delay?: number;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.7s ease ${options?.delay || 0}ms, transform 0.7s ease ${options?.delay || 0}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        }
      },
      { threshold: options?.threshold ?? 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.delay, options?.threshold]);

  return ref;
}

export function useGSAPFadeIn<T extends HTMLElement = HTMLDivElement>(
  delay?: number,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transition = `opacity 0.7s ease ${delay || 0}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

export function useGSAPSlideUp<T extends HTMLElement = HTMLDivElement>(
  delay?: number,
) {
  return useGSAPScrollReveal<T>({ delay });
}

export function useGSAPScaleIn<T extends HTMLElement = HTMLDivElement>(
  delay?: number,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "scale(0.9)";
    el.style.transition = `opacity 0.7s ease ${delay || 0}ms, transform 0.7s ease ${delay || 0}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
