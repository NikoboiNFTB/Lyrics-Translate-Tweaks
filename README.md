# LyricsTranslate-Tweaks

Collection of Tweaks for Lyrics Translate.

## Disable Copy Protection

### Description

Disables the copy protection for [lyricstranslate.com](https://lyricstranslate.com), allowing you to copy full song texts.

### Installation

**Lyrics Translate - Disable Copy Protection** can be installed as a minimal userscript ([install](https://github.com/NikoboiNFTB/LyricsTranslate-Tweaks/raw/refs/heads/main/allow-copying-1.0.user.js)).

Alternatively, just add the following filters to [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/):

```text
lyricstranslate.com##+js(aeld, copy)
lyricstranslate.com##+js(aeld, beforecopy)
```

>> Recommended over the userscript. Import and append… file can be found at [blocklist.txt](blocklist.txt).

### Demonstration

Normally, when you copy more than two verses you get:

```text
Ich leb noch immer bei Mama
Jetzt schon alt, doch immer da
Auch wenn die Ärmel jetzt länger sind
Bin ich immer noch ihr kleines Kind
 
Wir sind allein, doch viel zu zweit
Und teilen gern ein halbes Leid
Das Haus ist klein,
https://lyricstranslate.com/en/rammstein-meine-tranen-lyrics.html
```

But with Disable Copy Protection you can copy the entire text:

```text
Ich leb noch immer bei Mama
Jetzt schon alt, doch immer da
Auch wenn die Ärmel jetzt länger sind
Bin ich immer noch ihr kleines Kind
 
Wir sind allein, doch viel zu zweit
Und teilen gern ein halbes Leid
Das Haus ist klein, die Stille groß
Sie zwingt mich oft auf ihren Schoß
 
Ich leb noch immer bei Mama
Und bleibe wohl für immer da
Im Haus fehlt lange schon ein Mann
Ich helfe aus, so gut ich kann
Viel Liebe schenkt mir Mutter nicht
Doch schlägt sie immer noch in mein Gesicht
Und ab und zu hab ich geweint
Da hat sie lächelnd nur gemeint
 
Ein Mann weint nur, wenn seine Mutter stirbt
Der Tod ist stark, das Herz ist schwach
Wenn das eigen Fleisch im Blut verdirbt
Der Klügere gibt nach
 
Auch den Vater konnte sie nicht lieben
Hat ihn aus der Welt getrieben
Dann und wann ein stummer Schrei
Und eine kleine Litanei
Viel Liebe gab ihm Mutter nicht
Doch schlug sie oft in sein Gesicht
Ab und zu hat er geweint
Da hat sie lächelnd nur gemeint
 
Ein Mann weint nur, wenn seine Mutter stirbt
Der Tod ist stark, das Herz ist schwach
Wenn das eigen Fleisch im Blut verdirbt
Der Klügere gibt nach
Du solltest dich schämen
Zeig nie deine Tränen
Du solltest dich schämen
Zeig nie deine Tränen
Deine Tränen
 
Deine Tränen
Deine Tränen
```

### Technical

LyricsTranslate modifies your copy operation using a `copy` event listener on the song container.

When your selection is longer than a set threshold (220 in this case), the handler replaces it with a truncated version of the text and appends a link to the page just before it’s sent to the clipboard.

The relevant logic looks like this:

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

The Userscript neutralizes this behavior by intercepting the `copy` event in the capture phase, so the site’s handler never runs and your original selection is copied unchanged. The uBlock Origin filters achieve the same effect even earlier by blocking any `copy` or `beforecopy` listeners from being added to the page.

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
