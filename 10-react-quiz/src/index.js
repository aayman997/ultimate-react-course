import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {QuestionProvider} from "./contexts/QuestionsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QuestionProvider>
			<App />
		</QuestionProvider>
	</React.StrictMode>
);
