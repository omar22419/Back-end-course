import { resolve } from 'node:path'
import { config } from 'dotenv'

const envPath =  `.env.development`
config({ path: resolve(`./config/${envPath}`) })


export const port = process.env.PORT ?? 7000
export const DB_URI = process.env.DB_URI ?? ''



export const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? '10')
console.log({SALT_ROUND});
