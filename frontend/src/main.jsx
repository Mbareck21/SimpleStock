import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { theme2025, generateCssVariables } from "./styles/theme2025.js";

// Generate CSS variables from the theme and inject them into the document head
const cssVariables = generateCssVariables(theme2025);
const styleTag = document.createElement("style");
styleTag.innerHTML = cssVariables;
document.head.appendChild(styleTag);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
