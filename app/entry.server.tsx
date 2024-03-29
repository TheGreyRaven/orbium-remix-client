import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import type { EntryContext } from '@remix-run/node';
import { injectStylesIntoStaticMarkup } from '@mantine/ssr';
import { otherRootRouteHandlers } from './routes.server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  for (const handler of otherRootRouteHandlers) {
    const otherRouteResponse = await handler(request, remixContext);
    if (otherRouteResponse) return otherRouteResponse;
  }
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);
  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${injectStylesIntoStaticMarkup(markup)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}