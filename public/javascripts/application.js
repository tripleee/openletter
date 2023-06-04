$(() => {
  let expanded = false;
  let text;

  const switcher = {
    darkMode: false,
    init() {
      try {
        const storageValue = window.localStorage.getItem('darkMode');
        const darkMode = storageValue === 'true';
        this.switchMode(darkMode);
      } catch (e) {
                // ignore
      }
    },
    switchMode(darkMode) {
      if (darkMode) {
        const link = document.createElement('link');
        link.href = 'stylesheets/dark.css';
        link.rel = 'stylesheet';
        link.id = 'dark-sheet';
        document.head.appendChild(link);
      }
      else {
        const darkSheet = document.getElementById('dark-sheet');
        darkSheet.parentElement.removeChild(darkSheet);
      }
      this.darkMode = darkMode;
      try {
        window.localStorage.setItem('darkMode', this.darkMode);
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
