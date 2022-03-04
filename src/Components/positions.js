import { useEffect, useState } from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousedown", setFromEvent);

    // return () => {
    //   window.removeEventListener("mousedown", setFromEvent);
    // };
  }, []);

  return position;
};
