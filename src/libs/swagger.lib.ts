import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Sistema Tech",
    description: "API REST para la gestión de una tienda de tecnología",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "swagger-output.json";
const endpointsFiles = ["./src/app.ts"];

const originalReplaceAll = String.prototype.replaceAll;
String.prototype.replaceAll = function (searchValue, replaceValue) {
  if (
    typeof replaceValue === "string" &&
    searchValue instanceof RegExp &&
    !searchValue.global
  ) {
    return this.replace(searchValue, replaceValue);
  }
  return Reflect.apply(originalReplaceAll, this, [searchValue, replaceValue]);
};

try {
  const result = await swaggerAutogen()(outputFile, endpointsFiles, doc);
  if (result === false || !result.success) {
    throw new Error("No se pudo generar la documentación de Swagger.");
  }
} finally {
  String.prototype.replaceAll = originalReplaceAll;
}

await import("../index.js");
