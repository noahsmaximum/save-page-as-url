// ==UserScript==
// @name         Save as .url Shortcut
// @namespace    https://github.com/noahsmaximum/save-as-url
// @version      1.1.0
// @description  Adds a floating button to save the current page as a Windows .url internet shortcut file.
// @author       NoahsMaximum
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // Avoid injecting into iframes — only run on the top-level document.
    if (window.top !== window.self) return;

    // ---------------------------------------------------------------------
    // Filename handling
    // ---------------------------------------------------------------------

    // Strip characters that are illegal in Windows filenames, trim trailing
    // dots/spaces (also illegal on Windows), and cap length so downloads work.
    function sanitizeFilename(name) {
        let clean = (name || '')
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // reserved + control chars
            .replace(/\s+/g, ' ')                  // collapse whitespace
            .trim()
            .replace(/[. ]+$/, '');                // no trailing dot/space

        if (!clean) clean = 'shortcut';
        if (clean.length > 120) clean = clean.slice(0, 120).trim();
        return clean + '.url';
    }

    // ---------------------------------------------------------------------
    // .url file generation & download
    // ---------------------------------------------------------------------

    // Build a standard Windows Internet Shortcut. Uses CRLF line endings,
    // which is what Windows expects for .url files.
    function buildUrlFile(url) {
        return '[InternetShortcut]\r\nURL=' + url + '\r\n';
    }

    function saveShortcut() {
        const url = window.location.href;
        const filename = sanitizeFilename(document.title || window.location.hostname);
        const content = buildUrlFile(url);

        const blob = new Blob([content], { type: 'application/x-mswinurl' });
        const objectUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Release the object URL once the browser has had a moment to grab it.
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);

        showToast('Saved “' + filename + '”');
    }

    // ---------------------------------------------------------------------
    // UI: floating button + confirmation toast
    // ---------------------------------------------------------------------

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #suu-save-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 2147483647;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 10px 16px;
                font: 600 14px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: #fff;
                background: #2563eb;
                border: none;
                border-radius: 999px;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                cursor: pointer;
                opacity: 0.55;
                transition: opacity .2s ease, transform .15s ease, background .2s ease, box-shadow .2s ease;
                user-select: none;
            }
            #suu-save-btn:hover {
                opacity: 1;
                background: #1d4ed8;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
            #suu-save-btn:active {
                transform: translateY(0) scale(0.97);
            }
            #suu-toast {
                position: fixed;
                bottom: 74px;
                right: 20px;
                z-index: 2147483647;
                max-width: 320px;
                padding: 10px 14px;
                font: 500 13px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: #fff;
                background: #16a34a;
                border-radius: 8px;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                opacity: 0;
                transform: translateY(8px);
                transition: opacity .25s ease, transform .25s ease;
                pointer-events: none;
                word-break: break-word;
            }
            #suu-toast.suu-show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    let toastTimer = null;
    function showToast(message) {
        let toast = document.getElementById('suu-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'suu-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = '✅ ' + message;

        // Force reflow so the transition replays on repeated clicks.
        void toast.offsetWidth;
        toast.classList.add('suu-show');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('suu-show'), 2600);
    }

    function createButton() {
        const btn = document.createElement('button');
        btn.id = 'suu-save-btn';
        btn.type = 'button';
        btn.title = 'Save this page as a Windows .url shortcut';
        btn.textContent = '💾 Save as .url';
        btn.addEventListener('click', saveShortcut);
        document.body.appendChild(btn);
    }

    function init() {
        if (document.getElementById('suu-save-btn')) return;
        injectStyles();
        createButton();
    }

    if (document.body) {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
})();
