import { useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card } from "./styled/styled";
import "../App.css";
import { initializeTelegram } from "../telegram"; // Import Telegram initialization

export function Counter() {
  const { connected } = useTonConnect();
  const { username } = initializeTelegram(); // Get the username from Telegram
  
  const [tapCount, setTapCount] = useState(0); // State to track the tap count
  const [animate, setAnimate] = useState(false); // State to trigger animation

  // Function to handle the tap event
  const handleTap = () => {
    setTapCount(tapCount + 1); // Increment the tap count

    // Trigger animation
    setAnimate(true);

    // Reset animation state after 0.1s (duration of animation)
    setTimeout(() => {
      setAnimate(false);
    }, 100);
  };

  return (
    <div className="Container">
      {/* Display welcome message with the Telegram username */}
      <h2>Welcome {username}!</h2>

      <TonConnectButton />

      <Card>
        {/* Circle that can be tapped */}
        <div
          className={`circle ${animate ? 'animate' : ''}`} 
          onClick={handleTap}
        >
          Tap me like mad!
        </div>

        {/* Display the tap count below the circle */}
        <p className="tap-count">
          Tap Count: {tapCount}
        </p>
      </Card>
    </div>
  );
}
