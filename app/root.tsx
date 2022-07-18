import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider } from "@mantine/core";
import { Layout } from "./components";
import { NotificationsProvider } from "@mantine/notifications";

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
					<NotificationsProvider position="top-center">
						<Layout>
							<Outlet />
						</Layout>
						<ScrollRestoration />
						<Scripts />
						<LiveReload />
					</NotificationsProvider>
				</body>
			</html>
		</MantineProvider>
	);
};

export default App;
