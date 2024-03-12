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

    function patchJson(xhr) {
        if (xhr.responseText[0] === '{') {
            try {
                let json = JSON.parse(xhr.responseText);

                if (json.elections && json.elections.length >= 1 && json.elections[0].maxChoices && json.elections[0].deputies) {
                    json.elections[0].maxChoices = json.elections[0].deputies.length;

                    return JSON.stringify(json);
                }
            }
            catch (e) {
                console.error(e);
            }
        }

        return null;
    }

    const XHR = unsafeWindow.XMLHttpRequest;

    unsafeWindow.XMLHttpRequest = function() {
        let xhr = new XHR();

        const realSend = xhr.send;

        xhr.send = (data) => {
            let realOnLoad = xhr.onload;

            xhr.onload = () => {
                let patchedResponseText = patchJson(xhr);

                if (patchedResponseText !== null) {
                    Object.defineProperty(xhr, 'responseText', {
                        value: patchedResponseText,
                        writable: false
                    });
                }

                if (realOnLoad) {
                    realOnLoad.apply(xhr, arguments);
                };
            };

            return realSend.apply(xhr, arguments);
        };

        return xhr;
    };
})();
