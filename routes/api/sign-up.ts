// import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";
import { hash } from "https://deno.land/x/scrypt@v4.2.1/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { connect, release } from "../../shared/postgres.ts";

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
    const transaction = client.createTransaction("t1");

    try {
      const { email, passwd } = await req.json();

      //
      await transaction.begin();

      //
      const res1 = await transaction
        .queryArray`insert into public.user(email, passwd) values(${email}, ${hash(passwd)}) returning id`;
      const userId = res1.rows[0][0] as number;

      await transaction
        .queryArray`insert into profile(name, "userId") values(${email}, ${userId})`;

      const res2 = await transaction.queryObject<
        profile
      >`select * from public.profile p where p."userId"=${userId}`;

      //
      await transaction.commit();

      return Response.json({ profile: res2.rows[0] });
    } catch (e) {
      console.log(e);
      return new Response("error");
    } finally {
      release(client);
    }
  },
};
