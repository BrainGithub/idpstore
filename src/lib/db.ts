import pg from "pg";
import { PrismaClient } from "@prisma/client";

export { pool, client, prisma };

// official postgres client for node.js
const pool = new pg.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432", 10),
	database: process.env.DB_NAME,
});

// used for transactions by fetch one connection from the pool
const client = await pool.connect();

// prisma client for type-safe database queries
const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
