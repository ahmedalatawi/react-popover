import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  handler: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;

      // Check if the click target is inside any of the refs
      const isOutside = refs.every(ref => {
        const element = ref.current;
        if (!element) return true;

        // Check if the click target is inside the element or its children
        return !element.contains(event.target as Node);
      });

      if (isOutside) {
        handler();
      }
    };

    // Use mousedown for more responsive handling
    document.addEventListener('mousedown', handleClickOutside, true);
    
    // Also handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };
    document.addEventListener('keydown', handleEscape, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscape, true);
    };
  }, [refs, handler, enabled]);
};