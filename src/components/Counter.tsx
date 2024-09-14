import { useState, useEffect } from "react";
import { ref, set, update, get } from "firebase/database"; // Firebase functions for database
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

  useEffect(() => {
    // Load the current tap count from Firebase when the component mounts
    const fetchUserData = async () => {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTapCount(data.tapCount || 0); // Set the tap count if it exists in the database
      }
    };

    fetchUserData();
  }, [userId]);

  // Function to handle the tap event
  const handleTap = async () => {
    const newTapCount = tapCount + 1; // Increment the tap count
    setTapCount(newTapCount); // Update local state

    // Trigger animation
    setAnimate(true);

    // Reset animation state after 0.1s (duration of animation)
    setTimeout(() => {
      setAnimate(false);
    }, 100);

    // Prepare user data to be stored/updated in Firebase
    const userData = {
      username,
      tapCount: newTapCount,
      lastTapTimestamp: new Date().toISOString(), // Get current time (server time in ISO format)
      walletAddress: connected ? wallet : null, // Update wallet address if connected
    };

    // Update the user data in Firebase Realtime Database
    const userRef = ref(database, `users/${userId}`);

    // Write the updated user data to the database
    await update(userRef, userData);
  };

  useEffect(() => {
    // Update the user's wallet address in Firebase when wallet is connected
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
