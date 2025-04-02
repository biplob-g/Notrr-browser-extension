# Notrr - AI-Powered Note-Taking Chrome Extension

Notrr is a powerful Chrome extension that leverages Google's Gemini AI to help users create intelligent summaries and notes from web content.

## Features

- **AI-Powered Summaries**: Automatically generate concise summaries of web pages using Google's Gemini AI
- **Smart Note Taking**: Create and manage notes with rich text formatting
- **URL Integration**: Automatically captures and stores webpage URLs with your notes
- **Tag Organization**: Add and manage tags to organize your notes effectively
- **Mobile Responsive**: Fully responsive design that works on both desktop and mobile devices
- **Rich Text Editor**: Full-featured editor with formatting options

## Installation

1. Clone this repository:
```bash
git clone https://github.com/biplob-g/Notrr-browser-extension.git
cd Notrr-browser-extension
```

2. Install dependencies:
```bash
npm install
```

3. Create a `geminiService.ts` file and add your Gemini API key:
```env
GEMINI_API_KEY="your_api_key_here"
```

4. Build the extension:
```bash
npm run build
```

5. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from your build

## Usage

1. Click the Notrr icon in your Chrome toolbar
2. To create a new note:
   - Click "New Note" to start from scratch
   - Click "Generate with Gemini" to create an AI-powered summary of the current page
3. Organize your notes with tags
4. All notes are automatically saved and synced

## Tech Stack

- React + TypeScript
- Vite for building
- Google Generative AI SDK
- TailwindCSS for styling
- Chrome Extension APIs

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for providing the summarization capabilities
- Chrome Extensions API documentation
- React and the entire open-source community

## Support

For support, please open an issue in the GitHub repository or contact [your-email@example.com]