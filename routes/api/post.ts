import { Handlers } from "$fresh/server.ts";
import { client } from '../../shared/postgres.ts';
import { getUser } from '../../shared/jwt.ts';

export const handler: Handlers = {
  async GET() {
    const result = await client.queryObject
      `select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;
    return Response.json(result.rows);
  },
  async POST(req) {
    const { message } = await req.json();
    const user = await getUser(req);
    console.log(user, message);

    await client.queryArray
      `insert into post("userId", message) values(${user.id}, ${message})`;

    const result = await client.queryObject
      `select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;
    return Response.json(result.rows);
  }
};
