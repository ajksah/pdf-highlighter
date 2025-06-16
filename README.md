# 📄 PDF Highlighter: A Web-Based PDF Annotation Tool

![PDF Highlighter](https://img.shields.io/badge/version-1.0.0-blue.svg) ![GitHub Releases](https://img.shields.io/badge/releases-latest-orange.svg)

Welcome to the **PDF Highlighter** repository! This tool is designed for users who need to annotate PDFs efficiently. With features like text highlighting and comment addition, it serves as an ideal solution for reviewing documents, academic papers, and collaborative feedback. 

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Highlight Text**: Easily highlight important sections of your PDFs.
- **Add Comments**: Provide feedback or notes directly on the document.
- **User-Friendly Interface**: Simple and intuitive design for seamless navigation.
- **In-Memory Storage**: Current annotations are stored in memory for quick access.
- **Collaborative Feedback**: Ideal for teams working on documents together.

## Getting Started

To get started with **PDF Highlighter**, you can download the latest release from the [Releases section](https://github.com/ajksah/pdf-highlighter/releases). After downloading, follow the instructions to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ajksah/pdf-highlighter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pdf-highlighter
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

Your application should now be running on `http://localhost:3000`.

## Usage

### Highlighting Text

1. Open a PDF document using the upload feature.
2. Select the text you want to highlight.
3. Click on the highlight button to mark the selected text.

### Adding Comments

1. After highlighting, click on the highlighted text.
2. A comment box will appear. Type your notes and save them.

### Viewing Annotations

- You can view all your annotations in a dedicated sidebar. This allows for easy navigation and review of your notes.

## Technologies Used

- **React**: The core library for building the user interface.
- **PDF.js**: A library to render PDFs in the browser.
- **Redux**: For state management, making it easier to handle annotations.
- **CSS**: For styling the application, ensuring a clean and modern look.

## Future Plans

We aim to enhance **PDF Highlighter** by adding the following features:

- **Persistent Storage**: Implement a backend to store annotations permanently.
- **User Accounts**: Allow users to create accounts for saving their annotations across devices.
- **Export Options**: Enable users to export annotated PDFs.
- **Mobile Compatibility**: Optimize the tool for mobile devices for on-the-go usage.

## Contributing

We welcome contributions to **PDF Highlighter**! If you have suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your fork.
5. Open a pull request.

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: your-email@example.com
- **GitHub**: [ajksah](https://github.com/ajksah)

Thank you for checking out **PDF Highlighter**! For the latest updates, visit the [Releases section](https://github.com/ajksah/pdf-highlighter/releases).