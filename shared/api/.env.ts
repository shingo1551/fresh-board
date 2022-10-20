export const config = {
  database: "postgres",
  hostname: "db.uffutgvhycnzromcrulu.supabase.co",
  password: "Hodogaya502",
  port: 6543,
  user: "postgres",
  tls: {
    caCertificates: [
      await Deno.readTextFile(
        new URL("./prod-ca-2021.crt", import.meta.url),
      ),
    ],
    enabled: false,
  },
};
// postgres://postgres:[YOUR-PASSWORD]@db.uffutgvhycnzromcrulu.supabase.co:6543/postgres
// postgresql://postgres:[YOUR-PASSWORD]@db.uffutgvhycnzromcrulu.supabase.co:5432/postgres
