import { useEffect, useRef, type RefObject } from "react";

type IClickOutsideEvent = MouseEvent | TouchEvent;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: (event: IClickOutsideEvent) => void,
): RefObject<T | null> => {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);

  // Always keep the latest handler without re-attaching listeners
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: IClickOutsideEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handlerRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  return ref;
};
