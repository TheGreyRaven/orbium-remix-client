import type { MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider } from "@mantine/core";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Advanced software licensing",
	viewport: "width=device-width,initial-scale=1",
});

const App = () => {
	return (
		<MantineProvider
			theme={{
				colorScheme: "dark",
        colors: {
          dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5C5F66',
            '#373A40',
            '#2C2E33',
            '#25262B',
            '#0a0a0a',
            '#141517',
            '#101113'
          ],
        }
			}}
			withGlobalStyles
			withNormalizeCSS
		>
			<html lang="en">
				<head>
					<Meta />
					<Links />
				</head>
				<body>
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</html>
		</MantineProvider>
	);
};

export default App;
