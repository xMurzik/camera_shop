import { useEffect, useRef } from 'react';

const UseFocusModal = () => {
  const refModalDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const rootElement = refModalDiv.current;

        if (rootElement) {
          const focusableElements = rootElement.querySelectorAll(
            'input, button, textarea, select'
          );

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            (lastElement as HTMLElement).focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            (firstElement as HTMLElement).focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return refModalDiv;
};

export default UseFocusModal;
