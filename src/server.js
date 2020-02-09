const knex = require('knex')
const app = require('./app')

const {PORT, DB_URL} = require('./config');

const db = knex({
    client:'pg',
    connection: DB_URL,
})

app.listen(PORT ,()=>{
console.log(`Server is listening on http://localhost:${PORT}`)
})