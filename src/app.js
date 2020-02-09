require('dotenv').config()
const express = require('express')
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan')
const ArticlesService = require('./articles-service')
const app = express()
const { NODE_ENV } = require('./config')
const morganOption = (NODE_ENV=== 'production')
? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())



app.get('/',(req,res)=>{
res.status(200).send("Hello World.")
})

app.get('/articles', (req,res,next)=>{
    ArticlesService.getAllArticles()
    .then(articles =>{
        res.json(articles)
    })
    .catch(next)
})

app.use(function erroHandler(error, req,res,next){
 let response
 if( NODE_ENV === 'production'){
     response ={error:{message:'server error'}}
 }
 else {
     console.error(error)
     response = {message: error.message, error}
 }   
})

module.exports = app;
