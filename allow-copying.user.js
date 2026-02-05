// ==UserScript==
// @name         Lyrics Translate - Disable Copy Protection
// @namespace    https://github.com/NikoboiNFTB/LyricsTranslate-Tweaks
// @downloadURL  https://github.com/NikoboiNFTB/Lyrics-Translate-Tweaks/raw/refs/heads/main/allow-copying.user.js
// @version      1.0
// @description  Restores normal copy behavior for full song lyrics.
// @author       Nikoboi
// @icon         https://lyricstranslate.com/misc/logo-192-8bit.png
// @match        https://lyricstranslate.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  document.addEventListener(
    'copy',
    function (e) {
      e.stopImmediatePropagation();
    },
    true
  );

  document.addEventListener('copy', function (e) {
    const selection = window.getSelection().toString();
    if (selection) {
      e.clipboardData.setData('text/plain', selection);
      e.preventDefault();
    }
  });
})();
