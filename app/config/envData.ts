import dotEnv from 'dotenv';
import path from 'path'

dotEnv.config({path:path.join(process.cwd(), '.env')})



export const envData = {
    port : process.env.PORT,
    dbUrl : process.env.DBURL,
    mode: process.env.MODE,
    secretKey : process.env.SECRET_KEY,
    emailPassword : process.env.EMAIL_PASSWORD,
    email : process.env.EMAIL
}