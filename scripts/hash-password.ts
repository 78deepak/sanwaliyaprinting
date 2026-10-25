import bcrypt from "bcryptjs";
import readline from "readline";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n========================================================");
  console.log(" Sanwaliya Printing Press - Admin Password Hasher");
  console.log("========================================================\n");

  rl.question("Enter master password to hash: ", async (plainPassword) => {
    rl.close();

    const trimmed = plainPassword.trim();
    if (!trimmed) {
      console.error("\n❌ Error: Password cannot be blank or empty.\n");
      process.exit(1);
    }

    if (trimmed.length < 8) {
      console.warn("\n⚠️ Warning: Recommended minimum length is 8 characters.");
    }

    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(trimmed, saltRounds);

      console.log("\n✅ Hash generated successfully!");
      console.log("\nCopy and paste this into your .env.local file:\n");
      console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
      console.log("⚠️ Keep this hash secret. Never commit .env.local to Git!\n");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("\n❌ Failed to generate password hash:", msg);
      process.exit(1);
    }
  });
}

main();
