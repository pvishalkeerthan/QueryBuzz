
# QueryBuzz

QueryBuzz is a modern, high-performance query and database visualization application designed to simplify complex data interactions. The platform enables users to write, execute, and visualize database queries through an intuitive interface. With a focus on speed and efficiency, QueryBuzz transforms the way developers and analysts interact with their data by providing real-time results, collaborative features, and powerful visualization tools.


## Demo 🚀

Check out the live demo of the project by clicking the link below:

[View the project ](https://querybuzz.vercel.app/)



## Installation

First, clone the repository:

```bash
  git clone "https://github.com/pvishalkeerthan/QueryBuzz.git"
```
Next, navigate into the project directory:

```bash
  cd QueryBuzz
```
Then, install the dependencies:
```bash
  npm i
```
    
## Deployment

To deploy this project, follow these steps:

**Development Mode**

   To start the app in development mode, run:  
   ```bash
   npm run dev
   ```
**Production Build**  

   To create a production build, run:  
   ```bash
   npm run build
  ```



## Features

- Monaco Editor with syntax highlighting and auto-completion
- Multiple tabs to work on several queries simultaneously
- Query history to track and restore previous queries
- Smart notes for saving and organizing SQL snippets and reminders
- Pagination to handle large datasets efficiently
- Download SQL queries history for data analytics
- Keyboard shortcuts for easy access to common actions
- Download query results in CSV or JSON formats

## Npm Modules Used

## NPM Modules Used

- `@monaco-editor/react@^4.7.0`: Monaco Editor for code editing with syntax highlighting.
- `lucide-react@^0.485.0`: Icons for React UI.
- `react@^19.0.0`: JavaScript library for building UIs.
- `react-dom@^19.0.0`: React's virtual DOM interaction.
- `sql-formatter@^15.5.2`: SQL query formatting.
- `react-csv@^2.2.2`: Export data as CSV.
- `react-toastify@^9.0.5`: Toast notifications to display success or failure feedback.

## Performance Overview

The web app loads in about 0.4s to 0.9s on average. This was calculated using the Google Lighthouse tool in Chromium-based browsers.

### Local Performance Metrics:

- Largest Contentful Paint (LCP): 0.84s
- Cumulative Layout Shift (CLS): 0.00
- Interaction to Next Paint (INP): 0ms

### Metrics from Local Development Build (http://localhost:5173/):

### Key Lighthouse Metrics:

- First Contentful Paint (FCP): 0.9s
- Largest Contentful Paint (LCP): 2.8s
- Total Blocking Time (TBT): 150ms
- Cumulative Layout Shift (CLS): 0.001

## Steps Taken for Optimization:

- Used **Vercel** for deployment, providing fast and efficient global content delivery.
- Implemented **React.memo** and **lazy loading** to optimize component rendering and reduce unnecessary re-renders.
- Removed duplicate and repeated styling to reduce CSS size and improve performance.
- Adopted **modular CSS** to ensure efficient and maintainable styling.
- Added **pagination** to efficiently handle large datasets and improve user experience.







## Tech Stack

- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
- ![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078d4?style=for-the-badge&logo=visual-studio-code&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
