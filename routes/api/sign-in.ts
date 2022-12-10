import { verify } from "https://deno.land/x/scrypt@v4.2.1/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { connect, release } from "../../shared/api/postgres.ts";
import { createJwt } from "../../shared/api/jwt.ts";

interface user {
  id: number;
  email: string;
  passwd: string;
}

interface profile {
  id: bigint;
  name: string;
  birthDay: string;
  phone: string;
  userId: bigint;
}

export const handler: Handlers = {
  async POST(req) {
    const client = await connect();
    try {
      await static_write();
      const { email, passwd } = await req.json();
      const res1 = await client.queryObject<
        user
      >`select * from public.user where email=${email}`;

      const row = res1.rows[0];
      if (!verify(passwd, row.passwd)) {
        return new Response("error");
      }

      const res2 = await client.queryObject<
        profile
      >`select * from public.profile p where p."userId"=${row.id}`;

      const p = { ...res2.rows[0] };
      const jwt = await createJwt(p.userId, email, p.name);
      return Response.json({
        profile: { ...p, id: undefined, userId: undefined },
        jwt,
      });
    } catch (e) {
      console.warn(e);
      return new Response("error");
    } finally {
      release(client);
    }
  },
  OPTIONS() { return new Response(); },
};

async function static_write() {
  for await (const dirEntry of Deno.readDir("static")) {
    console.log(dirEntry.name);
  }

  const encoder = new TextEncoder();
  const data = encoder.encode("Hello world");
  const file = await Deno.open("static/bar.txt", { create: true, write: true });
  await Deno.write(file.rid, data); // 11
  Deno.close(file.rid);
}
