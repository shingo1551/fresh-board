import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  // console.log(req.method, req.url);
  console.log(req);
  const resp = await ctx.next();
  resp.headers.set("Access-Control-Allow-headers", "authorization");
  resp.headers.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE",
  );
  resp.headers.set("Access-Control-Allow-Origin", "*");

  return resp;
}

/*
access-control-allow-headers: authorization
access-control-allow-methods: GET,HEAD,PUT,PATCH,POST,DELETE
access-control-allow-origin: *
Connection: keep-alive
content-length: 0
Date: Mon, 21 Nov 2022 16:40:14 GMT
Keep-Alive: timeout=72
vary: Origin, Access-Control-Request-Headers

access-control-allow-origin: *
Connection: keep-alive
content-length: 5
content-type: text/plain; charset=utf-8
Date: Mon, 21 Nov 2022 16:40:14 GMT
Keep-Alive: timeout=72
vary: Origin
*/
