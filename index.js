const express = require('express')
const cors =require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId =require('mongodb').ObjectId;
const app = express()
require('dotenv').config()
const port = 5000
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaubw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const reviewCollection = client.db("startup").collection("services");
  const serviceCollection = client.db("startup").collection("service");
  const orderCollection = client.db("startup").collection("order");

// User Review
  app.post('/addReview',(req,res) =>{
    const review =req.body
    console.log(review)
    reviewCollection.insertOne(review)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })

  })

  app.get('/review' , (req,res) =>{
    reviewCollection.find()
    .toArray( (err , documents) =>{
      res.send(documents)
    })
  })

  // Admin Service
  app.post('/addService', (req,res) =>{
    const service = req.body
    console.log(service)
    serviceCollection.insertOne(service)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/services',(req , res) =>{
    serviceCollection.find()
    .toArray( (err , documents) =>{
      res.send(documents)
    })
  })

  app.get('/service/:id',(req,res) =>{
    const singleItem =ObjectId(req.params.id)
    serviceCollection.find({_id:singleItem})
    .toArray( (err, documents) =>{
      res.send(documents[0])
    })

  })

  // order details send server
  app.post('/order',(req,res) =>{
    const order = req.body
    console.log(service)
    orderCollection.insertOne(order)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })

  })
 console.log('database connected')
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)