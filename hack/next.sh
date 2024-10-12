#!/bin/bash
# pnpm add next@canary react@canary react-dom@canary

npm install -g pnpm


pnpm add react react-dom @types/react @types/react-dom

pnpm add -D tailwindcss postcss autoprefixer

npx tailwindcss init

pnpm i next-auth 

pnpm i @tailwindcss/typography
pnpm i @tailwindcss/container-queries
pnpm i @tailwindcss/forms