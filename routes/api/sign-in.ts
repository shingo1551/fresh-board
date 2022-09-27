// import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";
import { verify } from "https://deno.land/x/scrypt@v4.2.1/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { connect, release } from "../../shared/postgres.ts";
import { createJwt } from "../../shared/jwt.ts";

interface user {
  id: number;
  email: string;
  passwd: string;
}

interface profile {
  id: number;
  name: string;
  birthDay: string;
  phone: string;
  userId: number;
}

export const handler: Handlers = {
  async POST(req) {
    const client = await connect();
    try {
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
      console.log(e);
      return new Response("error");
    } finally {
      release(client);
    }
  },
};
