- right now hardcoding some types from prisma client, review this
- cleanup env variables usage (use vite)
- unplugin-swc, not needed if we cover tests using e2e
  - also no need nock
- [Vite coverage](https://vitest.dev/guide/coverage)

`docker run -d --name redis-server -p 6379:6379 redis`
`docker run --name my_postgres_container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tests -p 5433:5432 -d postgres`
