import { Handlers } from "$fresh/server.ts";
import { connect, release } from "../../shared/postgres.ts";
import { getUser } from "../../shared/jwt.ts";

export const handler: Handlers = {
  async GET() {
    return await query();
  },
  async POST(req) {
    const client = await connect();
    try {
      const { message } = await req.json();
      const user = await getUser(req);
      await client
        .queryArray`insert into post("userId", message) values(${user.id}, ${message})`;
      return query();
    } catch {
      return new Response("error");
    } finally {
      release(client);
    }
  },
};

async function query() {
  const client = await connect();
  try {
    const result = await client
      .queryObject`select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;
    console.log(result.rows);
    return Response.json(result.rows);
  } catch {
    return new Response("error");
  } finally {
    release(client);
  }
}
