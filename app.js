(() => {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.site-nav');
  let contactTrigger = null;

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    navigation?.classList.toggle('is-open', !open);
  });

  navigation?.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    toggle?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    toggle?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('is-open');
    toggle?.focus();
  });

  document.addEventListener('click', async (event) => {
    const openButton = event.target.closest('[data-contact-open]');
    const closeButton = event.target.closest('[data-contact-close]');
    const copyButton = event.target.closest('[data-copy-email]');
    const dialog = document.querySelector('[data-contact-dialog]');

    if (openButton && dialog) {
      contactTrigger = openButton;
      dialog.showModal();
      return;
    }

    if (closeButton && dialog) {
      dialog.close();
      contactTrigger?.focus();
      return;
    }

    if (event.target === dialog) {
      dialog.close();
      return;
    }

    if (copyButton) {
      const status = document.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
        copyButton.textContent = 'Copied';
        if (status) status.textContent = `${copyButton.dataset.copyEmail} copied to clipboard.`;
        window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 1800);
      } catch {
        if (status) status.textContent = 'Copy failed. Select the address above instead.';
      }
    }
  });
})();
