import { app } from "./app.js";
import { logger } from "./logger.js";

const port = app.get("port");
const host = app.get("host");

process.on("unhandledRejection", (reason) =>
	logger.error("Unhandled Rejection %O", reason),
);

app.listen(port).then(() => {
	logger.info(`Feathers app listening on http://${host}:${port}`);
});

export * from "./app.js";
export * from "./configuration.js";
export * from "./declarations.js";
export * from "./logger.js";
export * from "./validators.js";
export type { ServiceTypes } from "./client.js";
export * from "./services/missions/missions.shared.js";
export * from "./services/users/users.shared.js";
