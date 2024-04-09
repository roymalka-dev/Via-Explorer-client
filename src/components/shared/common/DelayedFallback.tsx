import React, { useState, useEffect } from "react";

/**
 * Props for the DelayedFallback component.
 */
interface DelayedFallbackProps {
  /**
   * The delay in milliseconds before the fallback content is displayed. Defaults to 1000ms.
   */
  delay?: number;

  /**
   * The fallback content to be displayed after the delay. This can be any React node.
   */
  fallback: React.ReactNode;
}

/**
 * The DelayedFallback component is used to delay the rendering of fallback content.
 * This is particularly useful for loading states, where you might not want to show a loading indicator immediately.
 *
 * @param {DelayedFallbackProps} props The properties for the DelayedFallback component.
 * @returns A React fragment that conditionally renders the fallback content after the specified delay.
 */
const DelayedFallback: React.FC<DelayedFallbackProps> = ({
  delay = 1000, // Default delay of 1000 milliseconds
  fallback,
}) => {
  const [showFallback, setShowFallback] = useState(false); // State to track whether to show the fallback content

  useEffect(() => {
    // Set up a timer that, after the specified delay, updates the state to show the fallback content
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    // Clean up the timer when the component unmounts or the delay changes
    return () => clearTimeout(timer);
  }, [delay]); // Effect dependencies include only the delay, as it's the only prop that can change

  // Conditionally render the fallback content based on the showFallback state
  return <>{showFallback ? fallback : null}</>;
};

export default DelayedFallback;
