const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const uri = "mongodb+srv://9t6:livelovedie@cluster0.dupvj.mongodb.net/creative-agency?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json());
const port = 5000;


const client = new MongoClient(
    uri,
    { useUnifiedTopology: true },
    { useNewUrlParser: true },
    { connectTimeoutMS: 30000 },
    { keepAlive: 1 }
  );
  client.connect(err => {
    const serviceCollection = client.db("creative-agency").collection("services");
    const reviewCollection = client.db("creative-agency").collection("reviews");
    const adminCollection = client.db("creative-agency").collection("admins");
    const orderCollection = client.db("creative-agency").collection("orders");
    // console.log('database connected');

    app.get("/services" , (req, res) => {        
        serviceCollection.find({})
        .toArray((err, documents)=>{
            res.send(documents);
        })
    })

    app.get("/reviews" , (req, res) => {        
      reviewCollection.find({})
      .toArray((err, documents)=>{
          res.send(documents);
      })
  })

  app.post('/isAdmin', (req, res) => {
    const email = req.body.email;
    doctorCollection.find({ email: email })
        .toArray((err, admins) => {
            res.send(admins.length > 0);
        })
})

app.post("/addOrder", (req, res) => {
  const order = req.body;
  orderCollection.insertOne(order).then((result) => {
    res.send(result.insertedCount > 0);
  });
});


  });
  app.get("/", (req, res) => {
    res.send("Hello Tazwar , your server working!");
  });
  
  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });