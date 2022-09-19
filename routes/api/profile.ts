import { HandlerContext } from "$fresh/server.ts";
import { client } from '../../shared/postgres.ts';

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const result = await client.queryObject
    `select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;

  return Response.json(result.rows);
};
