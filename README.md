# Lyrics-Translate-Tweaks

Collection of Tweaks for Lyrics Translate.

## Disable Copy Protection

### Overview

Disables the copy protection for [lyricstranslate.com](https://lyricstranslate.com), allowing you to copy full song lyrics.

### Usage

To enable, just add the following filters to [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/):

```text
lyricstranslate.com##+js(aeld, copy)
lyricstranslate.com##+js(aeld, beforecopy)
```

And you're done!

An *Import and append…* file is also provided; [blocklist.txt](blocklist.txt)

The blocklist filters work on desktop and mobile.

>> Tested with [Firefox](https://play.google.com/store/apps/details?id=org.mozilla.firefox) + [uBlock Origin](https://addons.mozilla.org/en-US/android/addon/ublock-origin/) for Android, YMMV.

*Disable Copy Protection* can also be installed as a userscript; [click me](https://github.com/NikoboiNFTB/LyricsTranslate-Tweaks/raw/refs/heads/main/allow-copying-1.0.user.js)

>> Userscript manager needed; ([Violentmonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)/[Tampermonkey for Chromium](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo))

>> Untested on mobile, but should maybe work probably idk I just work here

### Demonstration

Normally, when you try to copy more than one verse you get:

```text
Ein kleiner Mensch stirbt nur zum Schein
wollte ganz alleine sein
das kleine Herz stand still für Stunden
so hat man es für tot befunden
es wird verscharrt in nassem Sand
mit einer Spieluhr in der Hand
 
Der erste Schnee d
https://lyricstranslate.com/en/Rammstein-Spieluhr-lyrics.html
```

But with **Disable Copy Protection** you can copy the entire text:

```text
Ein kleiner Mensch stirbt nur zum Schein
wollte ganz alleine sein
das kleine Herz stand still für Stunden
so hat man es für tot befunden
es wird verscharrt in nassem Sand
mit einer Spieluhr in der Hand
 
Der erste Schnee das Grab bedeckt
hat ganz sanft das Kind geweckt
in einer kalten Winternacht
ist das kleine Herz erwacht
 
Als der Frost ins Kind geflogen
hat es die Spieluhr aufgezogen
eine Melodie im Wind
und aus der Erde singt das Kind
 
Hoppe hoppe Reiter
und kein Engel steigt herab
mein Herz schlägt nicht mehr weiter
nur der Regen weint am Grab
hoppe hoppe Reiter
eine Melodie im Wind
mein Herz schlägt nicht mehr weiter
und aus der Erde singt das Kind
 
Der kalte Mond in voller Pracht
hört die Schreie in der Nacht
und kein Engel steigt herab
nur der Regen weint am Grab
 
Zwischen harten Eichendielen
wird es mit der Spieluhr spielen
eine Melodie im Wind
und aus der Erde singt das Kind
 
Hoppe hoppe Reiter
und kein Engel steigt herab
mein Herz schlägt nicht mehr weiter
nur der Regen weint am Grab
hoppe hoppe Reiter
eine Melodie im Wind
mein Herz schlägt nicht mehr weiter
und aus der Erde singt das Kind
 
Hoppe hoppe Reiter
mein Herz schlägt nicht mehr weiter
 
Am Totensonntag hörten sie
aus Gottes Acker diese Melodie
da haben sie es ausgebettet
das kleine Herz im Kind gerettet
 
Hoppe hoppe Reiter
eine Melodie im Wind
mein Herz schlägt nicht mehr weiter
und auf der Erde singt das Kind
hoppe hoppe Reiter
und kein Engel steigt herab
mein Herz schlägt nicht mehr weiter
nur der Regen weint am Grab
 
Hoppe hoppe Reiter
Eine Melodie im Wind
Mein Herz schlägt nicht mehr weiter
Und auf der Erde singt das Kind
```

### Technical

LyricsTranslate intercepts your copy operations using a `copy` event listener on the song container. When a selection exceeds a set threshold (220 characters), the handler replaces it with a truncated version and appends a link to the page just before it’s sent to the clipboard.

The Userscript neutralizes this behavior by intercepting the `copy` event **first**, leaving the native interception logic asleep.

The uBlock Origin filters achieve the same effect even earlier by blocking any `copy` or `beforecopy` listeners from being added to the page in the first place, effectively taking out the native logic in its sleep.

This is how the site natively yoinks your `copy` events:

```js
function(e) {
  if (typeof window.getSelection == "undefined") return;
  var body_element = document.getElementsByClassName('song-node')[0];
  var selection = window.getSelection();
  var COPYLIMIT = 220; // Obvious function is obvious. Apparently the copy limit is 220 characters.
  if (("" + selection).length < COPYLIMIT) return;
  var newdiv = document.createElement('div');
  newdiv.style.position = 'absolute';
  newdiv.style.left = '-99999px'; // Slick move.
  body_element.appendChild(newdiv);
  var range = selection.getRangeAt(0);
  var documentFragment = range.cloneContents();
  var tempDiv = document.createElement("div");
  tempDiv.appendChild(documentFragment);
  trimContent(tempDiv, COPYLIMIT);
  newdiv.appendChild(tempDiv);
  if (selection.getRangeAt(0).commonAncestorContainer.nodeName == "PRE") {
    newdiv.innerHTML = "<pre>" + newdiv.innerHTML + "</pre>";
  }
  var linkname = window.location.protocol + '//' + window.location.hostname;
  if (document.location.href.length < 65) {
    linkname = document.location.href;
  }
  newdiv.innerHTML += "<a href='" + // New link constructor ig.
    document.location.href + "'>" +
    document.location.href + "</a>";
  selection.selectAllChildren(newdiv);
  window.setTimeout(function() {
    body_element.removeChild(newdiv);
  }, 200);
}
```

>> This `event` is tied to `<div id="songnode" class="song-node">`.

## File Tree

```text
.
├── allow-copying-1.0.user.js
├── blocklist.txt
├── LICENSE
└── README.md

1 directory, 4 files
```

## Contributing

Feel free to fork this repository and submit issues or pull requests if you have any suggestions or improvements. If you encounter any bugs or have feature requests, please open an issue.

## Credits

Created by **[Nikoboi](https://github.com/NikoboiNFTB/)**

Script and filters coughed up by **[ChatGPT](https://chatgpt.com/)**

## License

This project is licenced under the GNU General Public License V3. See [LICENSE](LICENSE) for details.

## Legal Disclaimer

**Disable Copy Protection** works like an ad-blocker by blocking specific script features and does not unlock or bypass any paid features. We do not endorse bypassing paid features, nor do we encourage violating any website’s terms of service.
