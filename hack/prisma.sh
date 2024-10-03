#!/bin/bash

# https://www.prisma.io/docs/getting-started/quickstart
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
# Run a migration to create your database tables with Prisma Migrate
npx prisma migrate dev --name init
# preview from UI by 
npx prisma studio

# for the updated database schema changing
npx prisma db push

npx prisma generate