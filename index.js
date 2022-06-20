import axios from 'axios'
import express from 'express'

const app = express()

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
          'X-RapidAPI-Key': '54ff9e1fe1mshf3ad4b1adc48033p1694c9jsne41a5d68345c',
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data[0])
      }).catch(function (error) {
          console.error(error);
      });

})

