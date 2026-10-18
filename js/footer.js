/* =============================================
   AMALAN S — Portfolio · footer.js
   Footer interaction — Clipboard copy buttons
   ============================================= */

(function () {
  'use strict';

  /**
   * Initialize a copy button with tooltip confirmation.
   * @param {string} btnId   - Element ID of the copy button
   * @param {string} toastId - Element ID of the copy tooltip
   */
  function initCopyBtn(btnId, toastId) {
    var btn = document.getElementById(btnId);
    var toast = document.getElementById(toastId);
    if (!btn || !toast) return;

    var timer = null;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var text = btn.getAttribute('data-copy') || '';
      var confirm = btn.getAttribute('data-confirm') || 'Copied!';

      function handleSuccess() {
        btn.classList.add('copied');
        showToast(confirm, false);
      }

      function handleFailure() {
        showToast('Failed to copy', true);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(handleSuccess).catch(function () {
          fallbackCopy(text) ? handleSuccess() : handleFailure();
        });
      } else {
        fallbackCopy(text) ? handleSuccess() : handleFailure();
      }
    });

    function fallbackCopy(text) {
      try {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        return false;
      }
    }

    function showToast(message, isError) {
      if (timer) clearTimeout(timer);
      toast.textContent = message;
      toast.style.background = isError ? '#E11D48' : '#6C35F7';
      toast.classList.add('visible');

      timer = setTimeout(function () {
        toast.classList.remove('visible');
        btn.classList.remove('copied');
        timer = null;
      }, 2000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCopyBtn('copy-email-btn', 'copy-email-toast');
      initCopyBtn('copy-phone-btn', 'copy-phone-toast');
    });
  } else {
    initCopyBtn('copy-email-btn', 'copy-email-toast');
    initCopyBtn('copy-phone-btn', 'copy-phone-toast');
  }
}());
