import typebox from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";
const Type = typebox.Type;
import { dataValidator } from "./validators.js";

export const configurationSchema = Type.Intersect([
	typebox.defaultAppConfiguration,
	Type.Object({
		host: Type.String(),
		port: Type.Number(),
		public: Type.String(),
	}),
]);

export type ApplicationConfiguration = Static<typeof configurationSchema>;

export const configurationValidator = typebox.getValidator(
	configurationSchema,
	dataValidator,
);
