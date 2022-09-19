import { HandlerContext } from "$fresh/server.ts";
import { client } from '../../shared/postgres.ts';
import { jsonResponse } from "../../shared/http.ts";

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const result = await client.queryObject
    `select name, message, "updatedAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;

  return jsonResponse(result.rows);
};
