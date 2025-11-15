import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import SavedProvider from "./providers/SavedProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import UserProvider from "./providers/UserProvider.tsx";
import SettingsProvider from "./providers/SettingsProvider.tsx";
import TrailerProvider from "./providers/TrailerProvider.tsx";


createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<TrailerProvider>
				<SettingsProvider>
					<UserProvider>
						<ThemeProvider>
							<SavedProvider>
								<App />
							</SavedProvider>
						</ThemeProvider>
					</UserProvider>
				</SettingsProvider>
			</TrailerProvider>
		</BrowserRouter>
	</StrictMode>
);
