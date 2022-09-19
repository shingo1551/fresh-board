import { Handlers } from "$fresh/server.ts";
import { client } from '../../shared/postgres.ts';
import { getUser } from '../../shared/jwt.ts';

export const handler: Handlers = {
  GET() {
    return query();
  },
  async POST(req) {
    const { message } = await req.json();
    const user = await getUser(req);

    await client.queryArray
      `insert into post("userId", message) values(${user.id}, ${message})`;

    return query();
  }
};
async function query() {
  const result = await client.queryObject
    `select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;
  return Response.json(result.rows);
}
