import "reflect-metadata"

import { ApolloServer } from 'apollo-server-express'
import { Task } from "./entities/Task"
import { TaskResolver } from './resolver/task'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import express from 'express'

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        database: 'todolist-graphql-db',
        entities: [Task,],
        logging: true,
        synchronize: true,
        username: 'postgres',
        password: 'postgres',
        port: 5432
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false
        }),
    })

    await apolloServer.start()
    const app = express()

    apolloServer.applyMiddleware({ app })
    app.get("/", (_req, res) => res.send("Hello World"))

    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => console.log(`Listening in port ${PORT}`))
}

main().catch(err => console.error(err))