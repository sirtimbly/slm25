// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import ajv from "@feathersjs/schema";
import type { Ajv } from "@feathersjs/schema";
import type { FormatsPluginOptions } from "@feathersjs/schema";

const formats: FormatsPluginOptions = [
	"date-time",
	"time",
	"date",
	"email",
	"hostname",
	"ipv4",
	"ipv6",
	"uri",
	"uri-reference",
	"uuid",
	"uri-template",
	"json-pointer",
	"relative-json-pointer",
	"regex",
];

export const dataValidator: Ajv = ajv.addFormats(new ajv.Ajv({}), formats);

export const queryValidator: Ajv = ajv.addFormats(
	new ajv.Ajv({
		coerceTypes: true,
	}),
	formats,
);
