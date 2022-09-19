import { create } from "https://deno.land/x/djwt@v2.7/mod.ts";

const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-512" }, true, ["sign", "verify"]);

export async function createJwt(id: number, email: string, name: string) {
  return await create({ alg: "HS512", typ: "JWT" }, { id, email, name }, key);
}
