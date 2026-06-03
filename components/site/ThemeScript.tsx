import Script from "next/script";

export function ThemeScript() {
  const script = `
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', theme === 'dark');
      } catch (error) {}
    })();
  `;

  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
