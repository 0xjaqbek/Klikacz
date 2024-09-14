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
    const backgroundColor = theme?.bg_color || '#ffffff';
    const textColor = theme?.text_color || '#000000';

    // Apply styles dynamically
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
  }
};
