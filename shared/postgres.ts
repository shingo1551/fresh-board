import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { config } from "../shared/.env.ts"

export const client = new Client(config);
await client.connect();
console.log('postgres connected!');

// await client.end();
