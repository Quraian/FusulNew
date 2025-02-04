- right now hardcoding some types from prisma client, review this
- cleanup env variables usage (use vite)
- unplugin-swc, not needed if we cover tests using e2e
  - also no need nock
- [Vite coverage](https://vitest.dev/guide/coverage)

- https://github.com/Quraian/Fusul/compare/main...simplify-test-setup

- `docker run -d --name redis-server -p 6379:6379 redis`
- `docker run -d --name redis-server-testing -p 6380:6379 redis`
- `docker run --name my_postgres_container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tests -p 5433:5432 -d postgres`

DATABASE_URL=postgresql://postgres:postgres@0.0.0.0:5433/tests
REDIS_HOST=localhost
VITE_API_URL=http://localhost:3000
OPEN_WEATHER_MAP_API_KEY=de84a13cc133a33d33a33b6ebc3e2b72
