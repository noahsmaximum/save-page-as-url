// ==UserScript==
// @name         Save Page as .url File
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Download the current page as a Windows .url shortcut file
// @author       You
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACw=
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Create a container for the button
    const container = document.createElement('div');
    container.id = 'save-url-container';
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        transition: right 0.3s ease;
    `;

    // Create a floating button for saving as .url
    const button = document.createElement('button');
    button.id = 'save-url-button';
    button.textContent = '💾 Save as .url';
    button.style.cssText = `
        padding: 10px 15px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px 0 0 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        box-shadow: -2px 2px 5px rgba(0,0,0,0.2);
        transition: background-color 0.3s ease, transform 0.1s ease;
        white-space: nowrap;
    `;

    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#45a049';
    });

    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4CAF50';
    });

    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });

    button.addEventListener('click', function() {
        saveAsUrlFile();
    });

    // Create the arrow indicator
    const arrow = document.createElement('div');
    arrow.id = 'save-url-arrow';
    arrow.textContent = '◀';
    arrow.style.cssText = `
        padding: 10px 8px;
        background-color: #4CAF50;
        color: white;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        box-shadow: -2px 2px 5px rgba(0,0,0,0.2);
        transition: background-color 0.3s ease;
        user-select: none;
    `;

    arrow.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#45a049';
    });

    arrow.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4CAF50';
    });

    arrow.addEventListener('click', function() {
        expandPanel();
    });

    container.appendChild(button);
    container.appendChild(arrow);
    document.body.appendChild(container);

    // Initially hide the button, show only the arrow
    let isExpanded = false;
    hidePanel();

    function expandPanel() {
        isExpanded = true;
        container.style.right = '0';
        button.style.display = 'block';
        arrow.textContent = '▶';
    }

    function hidePanel() {
        isExpanded = false;
        container.style.right = '-120px';
        button.style.display = 'none';
        arrow.textContent = '◀';
    }

    // Expand on hover, collapse when leaving
    container.addEventListener('mouseenter', function() {
        if (!isExpanded) {
            expandPanel();
        }
    });

    container.addEventListener('mouseleave', function() {
        hidePanel();
    });

    function saveAsUrlFile() {
        const pageTitle = document.title || 'Untitled';
        const pageUrl = window.location.href;

        // Create the .url file content (Windows Internet Shortcut format)
        const urlFileContent = `[InternetShortcut]\r\nURL=${pageUrl}\r\n`;

        // Create a blob from the content
        const blob = new Blob([urlFileContent], { type: 'text/plain' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);

        // Sanitize the filename
        const sanitizedTitle = pageTitle.replace(/[<>:"|?*]/g, '_').substring(0, 100);
        downloadLink.download = `${sanitizedTitle}.url`;

        // Trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Clean up the object URL
        URL.revokeObjectURL(downloadLink.href);

        // Show a brief confirmation message
        showNotification('✓ File saved as: ' + downloadLink.download);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.id = 'save-url-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            z-index: 10001;
            padding: 12px 18px;
            background-color: #333;
            color: #fff;
            border-radius: 5px;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease, slideDown 0.3s ease 2.7s forwards;
        `;

        // Add animation styles
        if (!document.querySelector('#save-url-styles')) {
            const style = document.createElement('style');
            style.id = 'save-url-styles';
            style.textContent = `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(10px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
})();