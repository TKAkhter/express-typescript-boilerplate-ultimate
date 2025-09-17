import 'source-map-support/register';
import { createServer } from './app';
import { config } from './config';
import { logger } from './utils/logger';

const server = createServer();

server.listen(config.PORT, () => {
    logger.info({ port: config.PORT }, 'Server started');
});
