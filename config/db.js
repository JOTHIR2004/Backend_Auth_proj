import pkg from 'pg';
import dotenv from 'dotenv';
const {Pool}=pkg;

dotenv.config();

const pool=new Pool({
    user:process.env.DBUSER,
    host:process.env.DBHOST,
    database:process.env.DBBASE,
    password:process.env.DBPASS,
    port:5432

});
export default pool;
