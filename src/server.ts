import { Server, createServer } from "http";
import e from "express";
import { exitLog } from "./helpers";
import { AppDataSource } from "./config/db";
import CONFIG from "./config";

export const startServer = (app: e.Application): Server => {
  const httpServer = createServer(app);

  AppDataSource.initialize()
    .then(() => {
      process.stdout.write(
        `📚 ${CONFIG.DATABASE.DB_NAME} has been initialized!\n`,
      );
    })
    .catch((err) => {
      process.stdout.write(
        `📚 Error ${CONFIG.DATABASE.DB_NAME} during initialization\n`,
        err,
      );
    });

  process
    .on("SIGINT", () => exitLog(null, "SIGINT"))
    .on("SIGQUIT", () => exitLog(null, "SIGQUIT"))
    .on("SIGTERM", () => exitLog(null, "SIGTERM"))
    .on("uncaughtException", (err) => exitLog(err, "uncaughtException"))
    .on("beforeExit", () => exitLog(null, "beforeExit"))
    .on("exit", () => exitLog(null, "exit"));

  return httpServer.listen({ port: CONFIG.APP.PORT }, (): void => {
    process.stdout.write(`⚙️ Application Environment: ${CONFIG.APP.ENV}\n`);
    process.stdout.write(`⏱ Started on: ${Date.now()}\n`);
    process.stdout.write(
      `🚀 TEN-STACK-API Server ready at http://localhost:${CONFIG.APP.PORT}\n`,
    );
  });
};
