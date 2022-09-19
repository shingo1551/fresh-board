import { Handlers } from "$fresh/server.ts";
import { client } from '../../shared/postgres.ts';
import { getUser } from '../../shared/jwt.ts';

export const handler: Handlers = {
  async GET(req) {
    const user = await getUser(req);
    const result = await client.queryObject
      `select name, "birthDay", phone from profile where "userId"=${user.id}`;
    return Response.json(result.rows);
  },
  async PUT(req) {
    try {
      const { name, phone, birth } = await req.json();
      const user = await getUser(req);

      await client.queryArray
        `update profile set name=${name}, "birthDay"=${birth}, phone=${phone} where "userId"=${user.id}`;

      return Response.json({ userId: user.id, name, phone, birthDay: birth });
    } catch (_e) {
      return new Response('error');
    }
  }
};
