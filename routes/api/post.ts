import { Handlers } from "$fresh/server.ts";
import { connect, getPosts, release } from "../../shared/api/postgres.ts";
import { getUser } from "../../shared/api/jwt.ts";

export const handler: Handlers = {
  async GET() {
    return await query();
  },
  async POST(req) {
    const client = await connect();
    try {
      const { message } = await req.json();
      const user = await getUser(req);
      const date = new Date();
      await client
        .queryArray`insert into post("userId", message, "createdAt") values(${user.id}, ${message}, ${date.getTime()})`;
      return query();
    } catch (e) {
      console.warn(e);
      return new Response("error");
    } finally {
      release(client);
    }
  },
  OPTIONS() {
    return new Response();
  },
};

async function query() {
  const client = await connect();
  try {
    return Response.json(await getPosts(client));
  } catch {
    return new Response("error");
  } finally {
    release(client);
  }
}
