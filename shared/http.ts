// deno-lint-ignore no-explicit-any
export function jsonResponse(body: any) {
  console.log(body);
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}
