import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import "./index.css";
import App from "./App";

Amplify.configure(config);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
