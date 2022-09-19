export const config = {
  database: "[database]",
  hostname: "[hostname]",
  password: "[password]",
  port: 5432,
  user: "[user]",
  tls: {
    caCertificates: [
      await Deno.readTextFile(
        new URL("[ca.crt]", import.meta.url),
      ),
    ],
    enabled: false,
  },
}
