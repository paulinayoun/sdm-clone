require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');

console.log('--- DB 접속 시도 정보 ---');
console.log('ID:', process.env.DB_USER);
console.log('DB 명:', process.env.DB_NAME);
console.log('-------------------------');

// 커넥션 풀 생성 (성능과 안정성을 위해 사용)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 프로미스(Promise) 버전으로 내보내기 (async/await 사용을 위함)
module.exports = pool.promise();
