import fastify, { type FastifyInstance } from "fastify";  
import { userRoutes } from "./routes/user.routes.js";
import { contactRoutes } from "./routes/contact.routes.js";

const app: FastifyInstance = fastify({logger: true})
app.register(
  userRoutes,{
    prefix: "/users"
  }
)
app.register(contactRoutes, {
  prefix: "/contact"
  }
)

app.listen({
  port:3333,
},
  () => console.log("servidor rodando na porta 3333")
)