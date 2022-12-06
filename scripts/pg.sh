docker run --name graphql-pg \
    -p 5432:5432 \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=todolist-graphql-db \
    -d  postgres