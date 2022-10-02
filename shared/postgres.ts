import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { config } from "./.env.ts";

const pool = new Pool(config, 10, true);
console.log("postgres connected!");

export function connect() {
  return pool.connect();
  // console.log('connected', pool.available);
}

export function release(client: PoolClient) {
  client.release();
  // console.log('released', pool.available);
}

// await pool.end();

//
interface Post {
  message: string;
  createdAt: string;
  name: string;
}

export async function getPosts(client: PoolClient) {
  const result = await client
    .queryObject<
    Post
  >`select name, message, "createdAt" from post p1 join profile p2 on p1."userId"=p2."userId"`;
  console.info(result.rows);
  const rows = result.rows.map((row) => ({
    ...row,
    createdAt: new Date(+row.createdAt.toString()).getTime(),
  }));
  return rows;
}
