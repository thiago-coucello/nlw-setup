import Fastify, { fastify } from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./routes";

const app = Fastify();

app.register(cors)

app.register(appRoutes)

app.listen({port: 3333, host: "0.0.0.0"}, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`HTTP server running on: ${address}`)
});