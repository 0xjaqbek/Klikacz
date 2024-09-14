// src/index.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeTelegram, applyTelegramTheme } from './telegram'; // Import Telegram functions
import "./index.css";

// Telegram WebApp initialization and theme handling
const { username, userId, theme } = initializeTelegram();
applyTelegramTheme(theme);

// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://raw.githubusercontent.com/0xjaqbek/Klikacz/main/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TonConnectUIProvider>
);
