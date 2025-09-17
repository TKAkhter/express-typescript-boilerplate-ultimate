import { config } from "./config";
import { createServer } from "./app";
import { logger } from "./utils/logger";

const PORT = config.PORT || 3000;

const app = createServer();

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});