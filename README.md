# Notebook Demo App

This Angular application demonstrates notebook functionality similar to Jupyter Notebook, leveraging Covalent components and color tokens. The main component utilized in this app is the Covalent `notebook-cell` component.

You can explore the `notebook-cell` component in more detail using the following [Storybook link](https://teradata.github.io/covalent/docs/components/?path=/docs/components-notebook-cell--overview).

## Features

- **Notebook Loading**: The app loads a Python notebook file, enabling users to interact with the content.
- **Drag and Drop**: Users can drag and drop cells within the notebook using the Angular CDK drag-and-drop library.
- **Cell Actions**: Supports cut, copy, paste, and delete actions on the cells.
- **Markdown Cells**: Includes markdown cells that can be edited by double-clicking on them to open the cell editor.

## Getting Started

To run the application locally:

1. Install the necessary dependencies:

   ```bash
   npm ci
   ```

2. Start the development server:
   ```bash
   ng serve
   ```

The application will be accessible at http://localhost:4200.

## Technologies Used

- **Angular**: Framework for building the application.
- **Covalent Components**: Used for notebook cells, icons, typography, and more.
- **Angular CDK**: Provides drag-and-drop functionality.
- **Color Tokens**: Used for consistent theming across the application.
- **Web Components**: The Covalent components are built as web components, which means they can be used not only with Angular but also with other frameworks like React, Vue, or even plain JavaScript.

This app serves as a demo for integrating Covalent components to create a notebook-like experience within an Angular application. Since the Covalent components are web components, this functionality can be replicated in other frameworks as well.
