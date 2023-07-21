import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storeV2 from "./store-v2";
import {Provider} from "react-redux";

storeV2.dispatch({type: "account/deposit", payload: 250});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={storeV2}>
			<App />
		</Provider>
	</React.StrictMode>
);

