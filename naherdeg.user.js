// ==UserScript==
// @name        NaherDeg
// @namespace   NaherDeg
// @match       http://deg.zhizhin.xyz:8080/ballot/*/*
// @grant       none
// @version     1.0
// @author      Ere
// @description 3/11/2024, 10:48:31 PM
// @licence     MIT
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    function patchJson(xhr) {
        if (xhr.responseText[0] === '{') {
            try {
                let json = JSON.parse(xhr.responseText);

                if (json.elections) {
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

    function patchXhr(xhr, patchedResponseText) {
        return new Proxy(xhr, {
            get(target, prop, receiver) {
                if (prop === 'responseText') {
                    return patchedResponseText;
                }
                return target[prop];
            }
        });
    }

    const XHR = unsafeWindow.XMLHttpRequest;

    unsafeWindow.XMLHttpRequest = function() {
        let xhr = new XHR();

        const realSend = xhr.send;

        xhr.send = function(data) {
            let realOnLoad = xhr.onload;
            let realOnLoadend = xhr.onloadend;

            xhr.onload = function() {
                console.log(this, xhr.responseText); // Here's your original response text

                let patchedResponseText = patchJson(xhr);

                let patchedXhr = xhr;

                if (patchedResponseText !== null) {
                    patchedXhr = patchXhr(xhr, patchedResponseText);
                }

                if (realOnLoad) {
                    realOnLoad.apply(patchedXhr, arguments);
                };

                if (realOnLoadend) {
                    realOnLoadend.apply(patchedXhr, arguments);
                }
            };

            return realSend.apply(xhr, arguments);
        };

        return xhr;
    };
})();
