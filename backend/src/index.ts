import logger from "./utils/logger.ts"
import config from "./utils/config.ts"
import app from "./app.ts"

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
