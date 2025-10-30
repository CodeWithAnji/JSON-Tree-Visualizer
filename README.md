# JSON Tree Visualizer

An interactive web application built with **React**, **Vite**, **Tailwind CSS**, and **React Flow** that visualizes JSON data as a hierarchical tree structure.

### Demo Preview

Below are a few screenshots of the JSON Tree Visualizer in action:

### Home Page
![Home Page](https://github.com/CodeWithAnji/JSON-Tree-Visualizer/blob/a6d17341b50b2b1b8a3ae5a4d0a66a86065b731b/src/Screenshorts/home.png)

### Tree Visualization
![Tree Visualization](./public/screenshots/tree-visualization.png)

### Search Functionality
![Search Feature](./public/screenshots/search.png)


## Features

- **JSON Input & Validation**
  - Paste or type JSON data in a text area.
  - Validates JSON format and shows error messages for invalid input.
  - Includes a pre-filled sample JSON.

- **Tree Visualization (React Flow)**
  - Displays hierarchical JSON structure using nodes and edges.
  - Nodes are color-coded based on data type:
  - **Objects** → Blue
  - **Arrays** → Green
  - **Primitives (string/number/boolean/null)** → Orange
  - Lines connect parent and child nodes clearly.

- **Search Functionality**
  - Search by JSON path (e.g., `$.user.address.city` or `items[0].name`).
  - Highlights matching node and automatically pans to its position.
  - Shows **“Match found”** or **“No match found”** messages.

- **Zoom Controls**
  - Buttons for **Zoom In**, **Zoom Out**, and **Fit View** integrated in the canvas.
  - Allows easy navigation of large JSON trees.
- **Clear/Reset Button** → Clears both input and visualization.
- **Copy JSON Path** → Click a node to copy its JSON path.
- **Download as Image** → Export the JSON tree as a `.png`.
- **Responsive Design** → Works across desktop and mobile layouts.


##  Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (Vite)** | Frontend Framework |
| **React Flow** | JSON Tree Visualization |
| **Tailwind CSS** | Styling and Layout |
| **html-to-image** | Download Tree as Image |
| **JavaScript (ES6+)** | Core Logic & Interactivity |


##  Run Locally

### 1. Clone the Repository

git clone https://github.com/CodeWithAnji/JSON-Tree-Visualizer.git

cd json-tree

### 2. Install Dependencies

npm install

### 3. Start the Developement Server

npm run dev

Then open the lcoal URL shown in yout terminal (Usually http://localhost:5173)

## Deployment Guide

### Deploy on Vercel

1. Push your project to **GitHub**.  
2. Go to [https://vercel.com/](https://vercel.com/).  
3. Click **“Add New Project” → “Import Git Repository”**.  
4. Select your **json-tree-visualizer** repository.  
5. Vercel automatically detects **Vite + React** setup.  
6. Click **Deploy** — your app will be live in seconds.  

### Deployed Link :  

https://json-tree-visualizer-wine.vercel.app/


## License

This project is open-source and free to use for educational and portfolio purposes.
