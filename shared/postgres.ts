import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { config } from "../shared/.env.ts"

const pool = new Pool(config, 10, true);
console.log('postgres connected!');

export function connect() {
  return pool.connect();
  // console.log('connected', pool.available);
}

export function release(client: PoolClient) {
  client.release();
  // console.log('released', pool.available);
}

// await pool.end();
