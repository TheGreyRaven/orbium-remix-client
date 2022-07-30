import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
} from "@remix-run/react";
import { MantineProvider } from "@mantine/core";
import { Layout } from "./components";
import { NotificationsProvider } from "@mantine/notifications";
import * as gtag from "~/utils/gtags.client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect } from "react";

type LoaderData = {
  gaTrackingId: string | undefined;
};

// Load the GA tracking id from the .env
export const loader: LoaderFunction = async () => {
  return json<LoaderData>({ gaTrackingId: process.env.GA_TRACKING_ID });
};


const App = () => {
	const location = useLocation();
  const { gaTrackingId } = useLoaderData<LoaderData>();

  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);
	
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
				{process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
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
