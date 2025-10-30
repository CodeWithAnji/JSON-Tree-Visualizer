# JSON Tree Visualizer

An interactive web application built with **React**, **Vite**, **Tailwind CSS**, and **React Flow** that visualizes JSON data as a hierarchical tree structure.


## Features


- **JSON Input & Validation**
  - Paste or type JSON data in a text area.
  - Validates JSON format and shows error messages for invalid input.
  - Includes a pre-filled sample JSON.

- **Tree Visualization (React Flow)**
  - Displays hierarchical JSON structure using nodes and edges.
  - Object, Array, and Primitive nodes are color-coded.
  - Lines connect parent and child nodes clearly.

- **Search Functionality**
  - Search by JSON path (e.g., `$.user.address.city` or `items[0].name`).
  - Highlights matching node and automatically pans to its position.
  - Displays message when a match is or isn’t found.


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

## License

This project is open-source and free to use for educational and portfolio purposes.
