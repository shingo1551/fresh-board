export default function () {
  console.log("Deno.version", Deno.version);
  console.log("osRelease", Deno.osRelease());
  console.log("memoryUsage", Deno.memoryUsage());

  console.log("hostname", Deno.hostname());
  console.log("systemMemoryInfo", Deno.systemMemoryInfo());
}
