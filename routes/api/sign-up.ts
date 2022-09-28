import { hash } from "https://deno.land/x/scrypt@v4.2.1/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { connect, release } from "../../shared/postgres.ts";

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
    const transaction = client.createTransaction("t1");

    try {
      const { email, passwd } = await req.json();

      //
      await transaction.begin();

      //
      const res1 = await transaction
        .queryArray`insert into public.user(email, passwd) values(${email}, ${hash(passwd)
        }) returning id`;
      const userId = res1.rows[0][0] as number;

      await transaction
        .queryArray`insert into profile(name, "userId") values(${email}, ${userId})`;

      const res2 = await transaction.queryObject<
        profile
      >`select * from public.profile p where p."userId"=${userId}`;

      //
      await transaction.commit();

      const row = { ...res2.rows[0] };
      return Response.json({ profile: { ...row, id: row.id.toString(), userId: undefined } });
    } catch (e) {
      console.warn(e);
      return new Response("error");
    } finally {
      release(client);
    }
  },
};
