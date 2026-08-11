import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedCounter({ value, duration = 1.2, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [value, duration]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}