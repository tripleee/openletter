$(() => {
  const darkModeKey = 'darkMode';

  let expanded = false;
  let text;

  const switcher = {
    darkMode: window.matchMedia('(prefers-color-scheme:dark)').matches,
    init() {
      try {
        const stored = window.localStorage.getItem(darkModeKey);

        if (stored !== null) {
          const darkMode = stored === 'true';
          this.switchMode(darkMode);
        }
      } catch (e) {
        // ignore
      }
    },
    switchMode(darkMode) {
      const link = document.querySelector('link[href$=\'dark.css\']');

      if (link) {
        link.disabled = !darkMode;
      }

      this.darkMode = darkMode;

      try {
        window.localStorage.setItem(darkModeKey, this.darkMode);
      } catch (e) {
        // ignore
      }
    },
    toggleDarkMode() {
      this.switchMode(!this.darkMode);
    }
  };

  $('.js-expand-signatories').on('click', evt => {
    evt.preventDefault();
    if (expanded) {
      $('.signatory-panel, .shadow').css({
        'max-height': '30em',
        'overflow-y': 'scroll'
      });
      $(evt.target).html(text);
    }
    else {
      text = $(evt.target).html();
      $('.signatory-panel, .shadow').css({
        'max-height': 'unset',
        'overflow-y': 'hidden'
      });
      $(evt.target).html('Contract &uarr;');
    }
    expanded = !expanded;
  });

  switcher.init();

  $('.color-mode-toggle').on('click', () => {
    switcher.toggleDarkMode();
  });
});
