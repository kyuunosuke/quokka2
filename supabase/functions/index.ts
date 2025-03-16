import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { pathname } = new URL(req.url);

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  // Redirect all requests to the SPA
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tempo Competitions</title>
        <meta http-equiv="refresh" content="0;url=/">
      </head>
      <body>
        <p>Redirecting to the application...</p>
      </body>
    </html>`,
    {
      headers: { "Content-Type": "text/html" },
      status: 200,
    },
  );
});
