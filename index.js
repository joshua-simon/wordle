import axios from 'axios'
import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'

const app = express()

app.use(cors())

const PORT = 8000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

app.get('/word', (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data)
      }).catch(function (error) {
          console.error(error);
      });

})

app.get('/check', (req,res) => {
    
    const word = req.query.word

    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
        params: {entry: word},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data.result_msg)
      }).catch(function (error) {
          console.error(error);
      });    
})


