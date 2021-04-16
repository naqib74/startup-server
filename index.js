const express = require('express')
const cors =require('cors')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())





const uri = "mongodb+srv://startupConsultant:startupConsultant71@cluster0.gaubw.mongodb.net/startup?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("startup").collection("services");

  app.post('/addReview',(req,res) =>{
    const review =req.body
    console.log(review)
    serviceCollection.insertOne(review)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })

  })

  app.post('/addService', (req,res) =>{
    const service = req.body
    console.log(service)
    serviceCollection.insertOne(service)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/review' , (req,res) =>{
    serviceCollection.find()
    .toArray( (err , documents) =>{
      res.send(documents)
    })
  })
 console.log('database connected')
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)