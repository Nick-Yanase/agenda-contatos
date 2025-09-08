import fastify, { type FastifyInstance } from "fastify";  

const app: FastifyInstance = fastify({logger: true})

app.listen({
  port:3333,
},
  () => console.log("servidor rodando na porta 3333")
)