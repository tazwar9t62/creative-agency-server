const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const fileUpload = require("express-fileupload");

const app = express();

const uri = "mongodb+srv://9t6:livelovedie@cluster0.dupvj.mongodb.net/creative-agency?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
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


app.post("/addReview", (req, res) => {
  const review = req.body;
  reviewCollection.insertOne(review)
  .then((result) => {
    res.send(result.insertedCount > 0);
  });
});

app.post("/addService", (req, res) => {
  const file = req.files.file;
  const title = req.body.title;
  const description = req.body.description;

  const newImg = req.files.file.data;
  const encImg = newImg.toString("base64");

  var img = {
    contentType: req.files.file.mimetype,
    size: req.files.file.size,
    img: Buffer.from(encImg, "base64"),
  };

  serviceCollection
    .insertOne({ title, description, img })
    .then((result) => {
      res.send(result.insertedCount > 0);
    });
});

app.post("/addAdmin", (req, res) => {
  const adminEmail = req.body;
  adminCollection.insertOne(adminEmail)
  .then((result) => {
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