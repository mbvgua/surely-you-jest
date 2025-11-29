import app from "./app";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server] running on port http://localhost:${port}...`);
});

