import { Handlers, PageProps } from "$fresh/server.ts";
import { connect, release, getPosts } from "../shared/postgres.ts";
import Head from "../components/Head.tsx";
import Body from "../components/Body.tsx";
import Board, { Posts } from "../islands/Board.tsx";

export const handler: Handlers<Posts> = {
  async GET(_, ctx) {
    const client = await connect();
    try {
      return ctx.render(await getPosts(client));
    } catch (e) {
      console.warn(e);
      return ctx.render(null);
    } finally {
      release(client);
    }
  },
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
