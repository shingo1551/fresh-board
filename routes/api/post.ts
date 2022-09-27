import { Handlers } from "$fresh/server.ts";
import { connect, release, getPosts } from "../../shared/postgres.ts";
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
    return Response.json(await getPosts(client));
  } catch {
    return new Response("error");
  } finally {
    release(client);
  }
}
