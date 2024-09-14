import { useState, useEffect } from "react";
import { ref, set, update, push } from "firebase/database"; // Firebase functions for database
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card } from "./styled/styled";
import "../App.css";
import { initializeTelegram } from "../telegram"; // Import Telegram initialization
import { database } from "../firebaseConfig"; // Firebase database initialization

export function Counter() {
  const { connected, wallet } = useTonConnect(); // Get wallet connection status and address
  const { username, userId } = initializeTelegram(); // Get the username and userId from Telegram
  
  const [tapCount, setTapCount] = useState(0); // State to track the tap count
  const [animate, setAnimate] = useState(false); // State to trigger animation

  // Function to handle the tap event
  const handleTap = async () => {
    setTapCount(tapCount + 1); // Increment the tap count

    // Trigger animation
    setAnimate(true);

    // Reset animation state after 0.1s (duration of animation)
    setTimeout(() => {
      setAnimate(false);
    }, 100);

    // Prepare user data to be stored in Firebase
    const tapData = {
      username,
      userId,
      tapCount: tapCount + 1,
      timestamp: new Date().toISOString(), // Get current time (server time in ISO format)
      walletAddress: connected ? wallet : "Not connected", // Add wallet address if connected
    };

    // Save the tap data in Firebase Realtime Database
    const tapsRef = ref(database, `users/${userId}/taps`); // Reference to user's tap data in database
    const newTapRef = push(tapsRef); // Create a new entry for each tap

    // Write the new tap data to the database
    await set(newTapRef, tapData);
  };

  useEffect(() => {
    // Update the user's data in Firebase when wallet is connected
    if (connected) {
      const userRef = ref(database, `users/${userId}`);
      update(userRef, {
        walletAddress: wallet,
      });
    }
  }, [connected, userId, wallet]);

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
