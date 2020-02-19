//require('dotenv').config()
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
    const knexInstance = req.app.get('db')

    ArticlesService.getAllArticles(knexInstance)
    .then(articles =>{
       res.json(articles )
       
        // res.json(articles.map(article =>({
            
        
            
        //     id:article.id,
        //     title:article.title,

        //     style:article.style,
        //     content: article.content,
        //     date_published: article.date_published
        // })))
    
        // res.json(articles.map(article => {
        //     let date_published = new Date(article.date_published)                 
        //      return {           
        //       id:article.id,
        //       title:article.title,
        //       style:article.style,
        //       content: article.content,
        //       date_published
        //      }
        //     }))





    })
    .catch(next)
})

app.get('/articles/:article_id', (req,res,next)=>{
    res.json({'requested_id': req.params.article_id, this: 'should fail'})
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
