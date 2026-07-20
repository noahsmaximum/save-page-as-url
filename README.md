# Save Page as .url File

A userscript that adds a convenient button to save any webpage as a Windows `.url` shortcut file.

## Features

✨ **Easy to Use**
- Adds a floating button "💾 Save as .url" to any webpage
- One-click download of the current page as a `.url` file

📝 **Smart Naming**
- Automatically uses the page title as the filename
- Sanitizes filenames to prevent errors

⚡ **Responsive UI**
- Hover effects and smooth animations
- Confirmation notification after saving
- Non-intrusive floating button positioned in the corner

🌐 **Universal Compatibility**
- Works on any website
- Uses the standard Windows Internet Shortcut format
- Compatible with all browsers that support userscripts

## Installation

### Prerequisites
Install a userscript manager in your browser:
- **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobp55f)
- **Firefox**: [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Safari**: [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

### Steps

1. Click the raw script link below or copy the content from `save-as-url-file.user.js`
2. In your userscript manager, create a new userscript
3. Paste the script code
4. Save and enable the script

**Direct Installation Link:**
```
https://raw.githubusercontent.com/noahsmaximum/save-page-as-url/main/save-as-url-file.user.js
```

Or copy-paste the code from the file in this repository.

## Usage

1. Navigate to any website
2. Look for the green "💾 Save as .url" button in the bottom-right corner
3. Click the button to download the page as a `.url` file
4. A confirmation message will appear
5. The file will be saved to your Downloads folder (or your configured download location)

## How It Works

The script creates a Windows Internet Shortcut file with the following format:
```
[InternetShortcut]
URL=https://example.com
```

This file can be:
- Opened to navigate to the webpage
- Added to Windows shortcuts/favorites
- Shared with others
- Organized in folders for later reference

## File Format

The `.url` file is a standard Windows Internet Shortcut format that can be opened by:
- Web browsers
- Windows File Explorer (double-click to open)
- Text editors (to view/edit the URL)

## Customization

You can customize the script by editing these values:

- **Button Position**: Change `bottom: 20px; right: 20px;` to move the button
- **Button Color**: Change `#4CAF50` (green) to your preferred color
- **Button Text**: Change `'💾 Save as .url'` to different text or emoji
- **Notification Duration**: Change `3000` (milliseconds) to adjust how long the confirmation shows

## Version History

### v1.0 (Current)
- Initial release
- Save webpage as `.url` file
- Floating button UI
- Confirmation notifications
- Filename sanitization

## License

This project is available for personal and commercial use.

## Contributing

Feel free to submit issues and enhancement requests!

## Troubleshooting

**Button doesn't appear?**
- Make sure your userscript manager is enabled
- Check that the script is active for the current domain
- Try refreshing the page

**File doesn't download?**
- Check your browser's download settings
- Ensure you have permission to write to your Downloads folder
- Try disabling any ad blockers that might interfere

**Filename looks weird?**
- The script sanitizes special characters automatically
- Very long page titles are truncated to 100 characters
- This is to prevent filesystem errors
