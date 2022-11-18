/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import info from "./shared/info.ts";
info();

import { Env } from "https://deno.land/x/env@v2.2.1/env.js";
const env = new Env();
console.info("LANG", env.get("LANG"));

const port = +(env.get("PORT") as string);
await start(manifest, port ? { port } : undefined);
