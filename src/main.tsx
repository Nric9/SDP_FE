import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add root variables for toast theme colors
const setToastThemeColors = () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.style.setProperty('--toast-background', '#1F2937');
    document.documentElement.style.setProperty('--toast-text', '#F3F4F6');
  } else {
    document.documentElement.style.setProperty('--toast-background', '#FFFFFF');
    document.documentElement.style.setProperty('--toast-text', '#374151');
  }
};

// Initial setup
setToastThemeColors();

// Listen for theme changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === 'attributes' &&
      mutation.attributeName === 'class'
    ) {
      setToastThemeColors();
    }
  });
});

observer.observe(document.documentElement, { attributes: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);