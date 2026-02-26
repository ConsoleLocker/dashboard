import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import AuthProvider from "./lib/Providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/App/store.js";

if (import.meta.env.VITE_NODE_ENV === "production")
	console.info("✅ Console Disabled"),
		Object.keys(console).forEach((p) => (console[p] = () => {}));

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
				<Toaster />
			</AuthProvider>
		</Provider>
	</React.StrictMode>
);