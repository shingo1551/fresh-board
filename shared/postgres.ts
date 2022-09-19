import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { config } from "../shared/.env.ts"

const pool = new Pool(config, 10, true); // `true` indicates lazy connections
console.log('postgres connected!');

export function connect() {
  // console.log('connect', pool.available);
  return pool.connect();
}

export function release(client: PoolClient) {
  client.release();
  // console.log('release', pool.available);
}

// await pool.end();
