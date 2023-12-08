import colors from 'picocolors';
import { createLogger } from 'vite';
import { s as startElectron } from './lib-N9HDHL2k.mjs';
import { build } from './lib-_sHeLVcw.mjs';
import 'node:path';
import 'node:fs';
import 'node:url';
import 'node:module';
import 'esbuild';
import 'node:child_process';
import 'node:fs/promises';
import 'magic-string';
import 'node:crypto';

async function preview(inlineConfig = {}, options) {
    if (!options.skipBuild) {
        await build(inlineConfig);
    }
    const logger = createLogger(inlineConfig.logLevel);
    startElectron(inlineConfig.root);
    logger.info(colors.green(`\nstart electron app...\n`));
}

export { preview };
