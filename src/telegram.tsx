// src/telegram.ts
import WebApp from '@twa-dev/sdk'; // Default import
import  themeParams  from '@twa-dev/sdk'; // Named import if themeParams is named

// Assuming initDataUnsafe is an object and should be accessed directly
const initDataUnsafe = WebApp.initDataUnsafe; // Access initDataUnsafe from WebApp or similar source

// Function to initialize Telegram WebApp and get user data and theme
export const initializeTelegram = () => {
  // Check if Telegram WebApp exists
  if (WebApp) {
    const user = initDataUnsafe.user; // Access user directly if initDataUnsafe is not callable
    const theme = themeParams; // Use themeParams as needed

    return {
      username: user?.username || 'Unknown',
      userId: user?.id || 'Unknown',
      theme,
    };
  }

  return {
    username: 'Unknown',
    userId: 'Unknown',
    theme: null,
  };
};

// Function to apply theme (light/dark mode)
export const applyTelegramTheme = (theme: any) => {
    if (theme) {
      const backgroundColor = theme?.bg_color || '#ffffff'; // Default for light mode
      const textColor = theme?.text_color || '#000000'; // Default for light mode
  
      // Apply styles dynamically to body
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = textColor;
  
      // Check if theme is night mode (dark mode)
      if (theme?.bg_color === "#000000" || theme?.bg_color === "#1c1c1e") {
        applyNightModeStyles(); // Apply additional dark mode styles
      } else {
        applyDayModeStyles(); // Apply additional light mode styles
      }
    }
  };
  
  // Additional CSS styles for Night Mode (dark mode)
  const applyNightModeStyles = () => {
    // Apply dark mode-specific styles
    document.documentElement.style.setProperty('--bg-color', '#21242c'); // Darker card background
    document.documentElement.style.setProperty('--card-bg-color', '#2c2c2e'); // Darker card background
    document.documentElement.style.setProperty('--button-bg-color', '#3a3a3c'); // Darker button background
    document.documentElement.style.setProperty('--button-text-color', '#ffffff'); // Light text color on buttons
    document.documentElement.style.setProperty('--circle-bg-color', '#4a4a4c'); // Darker circle background
    document.documentElement.style.setProperty('--tap-count-color', '#e5e5e7'); // Lighter text for tap count
  
    // You can extend this with more CSS variables or direct styles
  };
  
  // Additional CSS styles for Day Mode (light mode)
  const applyDayModeStyles = () => {
    // Apply light mode-specific styles
    document.documentElement.style.setProperty('--bg-color', '#ffffff'); // Light card background
    document.documentElement.style.setProperty('--card-bg-color', '#ffffff'); // Light card background
    document.documentElement.style.setProperty('--button-bg-color', '#f1f1f1'); // Light button background
    document.documentElement.style.setProperty('--button-text-color', '#000000'); // Dark text color on buttons
    document.documentElement.style.setProperty('--circle-bg-color', '#e0e0e0'); // Lighter circle background
    document.documentElement.style.setProperty('--tap-count-color', '#333333'); // Darker text for tap count
  };
  
