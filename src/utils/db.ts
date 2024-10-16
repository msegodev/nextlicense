// // src/utils/db.ts
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})



// import { Client } from 'pg';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

// export default client;

// // Conéctate a la base de datos
// (async () => {
//   await client.connect();
// })();

