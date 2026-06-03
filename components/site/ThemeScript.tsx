export function ThemeScript() {
  const script = `
    (function() {
      try {
        var saved = window.localStorage.getItem('theme');
        if (saved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return (
    <script
      id="theme-script"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
