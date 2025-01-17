import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// vite.config.js

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [
					[
						"babel-plugin-styled-components",
						{
							displayName: true,
							fileName   : false
						}
					]
				]
			}
		})
	]
});
