/* =========================================================
   KASO — WIKA / LANGUAGE
   'tl' = Filipino (default), 'en' = English. Changing it reloads the page.
   ========================================================= */
(function () {
  'use strict';
  let l = 'tl';
  try { l = localStorage.getItem('kaso-lang') || 'tl'; } catch (e) { /* no storage */ }
  window.KASO_LANG = l === 'en' ? 'en' : 'tl';
})();
