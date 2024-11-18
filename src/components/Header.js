import React, { useState, useEffect } from "react";

const Header = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "Broken Jaw? Still Crushing Goals!",
    "Shattered Collarbone, Unstoppable Strength!",
    "Even with a Broken Jaw, Fitness Never Stops!",
    "Collarbone May Break, But Strength Remains!",
    "Jaw's Broken? Keep Lifting, Keep Pushing!",
    "Fitness Isn’t Stopped by a Broken Bone!",
    "Bone May Break, But Fitness is Unbreakable!",
    "No Matter the Injury, Fitness Prevails!"
  ];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/">
          <img
            className="logo"
            src="/brokefitness.png"
            alt="The Broke Fitness Logo"
          />
        </a>
      </div>
      <h1>The Broke Fitness</h1>
      <p>Select a muscle group to explore exercises and save your favorites!</p>
      <div className="rolling-quote">
        <p>{quotes[quoteIndex]}</p>
      </div>
    </header>
  );
};

export default Header;
