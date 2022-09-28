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
      const date = new Date();
      console.info(date, -date.getTimezoneOffset() / 60);
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
