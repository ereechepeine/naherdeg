// ==UserScript==
// @name        Ломаный ДЭГ
// @namespace   NaherDeg
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      Ere
// @description Ставим в ДЭГ столько галок, сколько нужно
// @licence     MIT
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    function patchResponse(xhr) {
        if (xhr.responseText != '' && xhr.responseText[0] === '{') {
            try {
                let json = JSON.parse(xhr.responseText);

                if (json.elections && json.elections.length >= 1 && json.elections[0].maxChoices && json.elections[0].deputies) {
                    json.elections[0].maxChoices = json.elections[0].deputies.length;

                    Object.defineProperty(xhr, 'responseText', {
                        value: JSON.stringify(json),
                        writable: false
                    });
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    const XHR = unsafeWindow.XMLHttpRequest;

    unsafeWindow.XMLHttpRequest = function() {
        let xhr = new XHR();

        const realSend = xhr.send;

        xhr.send = data => {
            let realOnLoad = xhr.onload;

            xhr.onload = event => {
                patchResponse(xhr);

                xhr.onload = realOnLoad;
                if (realOnLoad) {
                    xhr.onload(event);
                };
            };

            xhr.send = realSend;
            return xhr.send(data);
        };

        return xhr;
    };
})();
