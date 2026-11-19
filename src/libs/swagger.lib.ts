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

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("../index.js");
});
