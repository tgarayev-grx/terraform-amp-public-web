import type { IncomingMessage, ServerResponse } from "http";
import type { LoggerOptions } from "pino";

/** Paths we skip for request logging (static assets, Next internals). */
const SKIP_LOG_PATH =
  /^\/_next\/static(\/|$)|^\/_next\/image(\/|$)|^\/favicon\.ico$|\.(ico|png|jpg|jpeg|gif|webp|svg|woff2?|css|js)$/i;

function shouldLogPath(path: string): boolean {
  return path.length > 0 && !SKIP_LOG_PATH.test(path);
}
/**
 * Runs once when the Next.js Node.js server starts.
 * Patches the HTTP server to log request/response for pages and API routes only
 * (skips static assets and Next internals).
 */
export async function register() {
  // Next.js calls register() in both Node and Edge runtimes. Only patch HTTP in Node.
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const http = await import("http");
  const https = await import("https");

  const pino = (await import("pino")).default;
  const isDev = process.env.NODE_ENV === "development";

  const formatters: LoggerOptions["formatters"] = {
    level(label) {
      // Pino defaults to numeric `level` in JSON; use labels (e.g. "info") for prod logs.
      return { level: label };
    },
  };

  const logger = isDev
    ? pino({
        formatters,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        },
      })
    : pino({ formatters });

  const install = (Server: typeof http.Server | typeof https.Server) => {
    const originalEmit = Server.prototype.emit;

    Server.prototype.emit = function (this, event: string, ...args: unknown[]) {
      if (event === "request") {
        const request = args[0] as IncomingMessage;
        const response = args[1] as ServerResponse;

        const start = Date.now();

        response.once("finish", () => {
          const path = request.url?.split("?")[0] ?? "";

          if (!shouldLogPath(path)) return;

          const timestamp = Date.now();
          const durationMS = timestamp - start;

          logger.info({
            timestamp: new Date(timestamp).toISOString(),
            method: request.method,
            path,
            status: response.statusCode,
            durationMS,
          });
        });
      }

      return originalEmit.apply(this, [
        // TS doesn't do well with overloads
        event as "upgrade",
        ...(args as [any, any, any]),
      ]);
    };
  };

  install(http.Server);
  install(https.Server);
}
