import React, { useEffect } from "react";

const events = [`mousedown`, `touchstart`] as const;

export default (ref: React.RefObject<any>, onClickOutside: () => void) => {
  const isOutside = (element: EventTarget) =>
    !ref.current || !ref.current.contains(element);
  const onClick = (event: MouseEvent | TouchEvent) => {
    if (event.target && isOutside(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, onClick);
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, onClick);
      }
    };
  });
};
