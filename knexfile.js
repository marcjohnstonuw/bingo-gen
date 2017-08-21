// knexfile.js
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: 'ec2-184-73-249-56.compute-1.amazonaws.com'
  }
};