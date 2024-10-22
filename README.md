docker run -d \
  --name finance-app-postgres
  -e POSTGRES_PASSWORD=admin
  -e POSTGRES_USER=admin
  -e POSTGRES_DB=financeapp \
  -v D:/arquivos/development/estudos/FullStackClub/finance-app/finance-app-api/.postgres:/var/lib/postgresql/data \
  -p 5433:5432 \
  postgres

  docker run -d --name finance-app-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=financeapp -v D:/arquivos/development/estudos/FullStackClub/finance-app/finance-app-api/.postgres:/var/lib/postgresql/data -p 5433:5432 postgres

  docker run -d --name finance-app-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=financeapp -v D:/arquivos/development/estudos/FullStackClub/finance-app/finance-app-api/.postgres:/var/lib/postgresql/data -p 5433:5432 postgres