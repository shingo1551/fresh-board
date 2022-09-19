import { Handlers, PageProps } from "$fresh/server.ts";
import { connect, release } from '../shared/postgres.ts';
import Head from '../components/Head.tsx';
import Body from "../components/Body.tsx";
import Board from '../islands/Board.tsx';
import { Posts } from '../shared/posts.ts';

export const handler: Handlers<Posts> = {
  async GET(_, ctx) {
    const client = await connect();
    try {
      const result = await client.queryObject
        `select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;
      return ctx.render(result.rows as Posts);
    } catch {
      return ctx.render(null);
    } finally {
      release(client);
    }
  }
};

export default function Index({ data }: PageProps<Posts>) {
  return (
    <>
      <Head>
        <meta name="description" content="Welcome to the Fresh Board." />
        <title>Fresh Board | Board</title>
      </Head>
      <Body>
        <Board posts={data} />
      </Body>
    </>
  );
}
