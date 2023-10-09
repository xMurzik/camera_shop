import { useEffect, useRef } from 'react';

const useKeyPress = () => {
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const downHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowDown') {
        evt.preventDefault();
        const rootElement = ulRef.current;
        let isFocused = true;
        if (rootElement) {
          const focusableElements = rootElement.querySelectorAll('li');

          if (document.activeElement?.className === 'form-search__input') {
            evt.preventDefault();
            focusableElements[0].focus();
          } else if (
            document.activeElement?.className === 'form-search__select-item'
          ) {
            focusableElements.forEach((el, id) => {
              if (el === document.activeElement && isFocused) {
                focusableElements[id + 1]?.focus();
                isFocused = false;
              }
            });
          }
        }
      }
    };

    const upHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowUp') {
        evt.preventDefault();
        const rootElement = ulRef.current;

        if (rootElement) {
          const focusableElements = rootElement.querySelectorAll('li');

          if (document.activeElement?.className === 'form-search__input') {
            evt.preventDefault();
            focusableElements[0].focus();
          } else if (
            document.activeElement?.className === 'form-search__select-item'
          ) {
            focusableElements.forEach((el, id) => {
              if (el === document.activeElement) {
                focusableElements[id - 1]?.focus();
              }
            });
          }
        }
      }
    };

    document.addEventListener('keydown', downHandler);
    document.addEventListener('keydown', upHandler);

    return () => {
      document.removeEventListener('keydown', downHandler);
      document.removeEventListener('keydown', upHandler);
    };
  }, []);

  return ulRef;
};

export default useKeyPress;
