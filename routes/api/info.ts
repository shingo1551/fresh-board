import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const body = {
    "Deno.version": Deno.version,
    // "osRelease": Deno.osRelease(),
    // "memoryUsage": Deno.memoryUsage(),
    // "hostname": Deno.hostname(),
    // "systemMemoryInfo": Deno.systemMemoryInfo()
  };

  return new Response(JSON.stringify(body, null, '  '));
};
