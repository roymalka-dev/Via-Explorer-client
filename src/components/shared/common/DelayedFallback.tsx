import React, { useState, useEffect } from "react";

interface DelayedFallbackProps {
  delay?: number;
  fallback: React.ReactNode;
}

const DelayedFallback: React.FC<DelayedFallbackProps> = ({
  delay = 1000,
  fallback,
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return <>{showFallback ? fallback : null}</>;
};

export default DelayedFallback;
