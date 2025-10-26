import { useState, useEffect } from 'react';

export default function useDarkTheme() {
  const currentTheme = localStorage.getItem('ms-theme');
  const condition = currentTheme === 'dark' ? 'dark' : 'light';
  const [isDark, setIsDark] = useState(condition);

  const toggleIsDark = () => {
    setIsDark(isDark === 'light' ? 'dark' : 'light');
    localStorage.setItem('ms-theme', isDark === 'light' ? 'dark' : 'light');
  };

  const providerValue = { isDark, toggleIsDark };

  useEffect(() => document.documentElement.setAttribute('ms-theme', condition), [isDark]);

  return { providerValue };
}
