/// <reference types="node" />
import { UserConfig as UserConfig$1, UserConfigExport as UserConfigExport$1, ConfigEnv, LogLevel, Plugin, FilterPattern } from 'vite';
export { LogLevel, createLogger, defineConfig as defineViteConfig, splitVendorChunk, splitVendorChunkPlugin } from 'vite';
import { TransformConfig } from '@swc/core';

interface UserConfig {
    /**
     * Vite config options for electron main process
     *
     * https://vitejs.dev/config/
     */
    main?: UserConfig$1 & {
        configFile?: string | false;
    };
    /**
     * Vite config options for electron renderer process
     *
     * https://vitejs.dev/config/
     */
    renderer?: UserConfig$1 & {
        configFile?: string | false;
    };
    /**
     * Vite config options for electron preload files
     *
     * https://vitejs.dev/config/
     */
    preload?: UserConfig$1 & {
        configFile?: string | false;
    };
}
interface UserConfigSchema {
    /**
     * Vite config options for electron main process
     *
     * https://vitejs.dev/config/
     */
    main?: UserConfigExport$1;
    /**
     * Vite config options for electron renderer process
     *
     * https://vitejs.dev/config/
     */
    renderer?: UserConfigExport$1;
    /**
     * Vite config options for electron preload files
     *
     * https://vitejs.dev/config/
     */
    preload?: UserConfigExport$1;
}
type InlineConfig = Omit<UserConfig$1, 'base'> & {
    configFile?: string | false;
    envFile?: false;
    ignoreConfigWarning?: boolean;
};
type UserConfigFn = (env: ConfigEnv) => UserConfigSchema | Promise<UserConfigSchema>;
type UserConfigExport = UserConfigSchema | Promise<UserConfigSchema> | UserConfigFn;
/**
 * Type helper to make it easier to use `electron.vite.config.*`
 * accepts a direct {@link UserConfig} object, or a function that returns it.
 * The function receives a object that exposes two properties:
 * `command` (either `'build'` or `'serve'`), and `mode`.
 */
declare function defineConfig(config: UserConfigExport): UserConfigExport;
interface ResolvedConfig {
    config?: UserConfig;
    configFile?: string;
    configFileDependencies: string[];
}
declare function resolveConfig(inlineConfig: InlineConfig, command: 'build' | 'serve', defaultMode?: string): Promise<ResolvedConfig>;
declare function loadConfigFromFile(configEnv: ConfigEnv, configFile?: string, configRoot?: string, logLevel?: LogLevel, ignoreConfigWarning?: boolean): Promise<{
    path: string;
    config: UserConfig;
    dependencies: string[];
}>;

declare function createServer(inlineConfig: InlineConfig | undefined, options: {
    rendererOnly?: boolean;
}): Promise<void>;

/**
 * Bundles the electron app for production.
 */
declare function build(inlineConfig?: InlineConfig): Promise<void>;

declare function preview(inlineConfig: InlineConfig | undefined, options: {
    skipBuild?: boolean;
}): Promise<void>;

/**
 * Load `.env` files within the `envDir`(default: `process.cwd()`).
 * By default, only env variables prefixed with `MAIN_VITE_`, `PRELOAD_VITE_` and
 * `RENDERER_VITE_` are loaded, unless `prefixes` is changed.
 */
declare function loadEnv(mode: string, envDir?: string, prefixes?: string | string[]): Record<string, string>;

interface BytecodeOptions {
    chunkAlias?: string | string[];
    transformArrowFunctions?: boolean;
    removeBundleJS?: boolean;
    protectedStrings?: string[];
}
/**
 * Compile to v8 bytecode to protect source code.
 */
declare function bytecodePlugin(options?: BytecodeOptions): Plugin | null;

interface ExternalOptions {
    exclude?: string[];
    include?: string[];
}
/**
 * Automatically externalize dependencies
 */
declare function externalizeDepsPlugin(options?: ExternalOptions): Plugin | null;

type SwcOptions = {
    include?: FilterPattern;
    exclude?: FilterPattern;
    transformOptions?: TransformConfig;
};
/**
 * Use SWC to support for emitting type metadata for decorators.
 * When using `swcPlugin`, you need to install `@swc/core`.
 */
declare function swcPlugin(options?: SwcOptions): Plugin;

export { type BytecodeOptions, type ExternalOptions, type InlineConfig, type ResolvedConfig, type SwcOptions, type UserConfig, type UserConfigExport, type UserConfigFn, type UserConfigSchema, build, bytecodePlugin, createServer, defineConfig, externalizeDepsPlugin, loadConfigFromFile, loadEnv, preview, resolveConfig, swcPlugin };
