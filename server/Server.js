// import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// import modules (mongoose needed for database connection)
const mongoose = require("mongoose");
const router = require('./Routes');

// instance of express
const app = express();

const port = 3001;

// body parser for either json or urlencoded responses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// connect to database
const dbURL = process.env.REACT_APP_MONGODB;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  // then listen on port 3001
  .then((result) =>
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    })
  )
  .catch((error) => console.log(`There is a connection error: ${error}`));

// creating some error handling for the database
const database = mongoose.connection;
database.once("open", () => {
  console.log("Database connected");
});
database.on("error", () => {
  console.log("Database error");
});

// once server is up
app.get("/", async (request, response) => {
    response.send("This is server side");
    console.log('GET');
  });
  
  app.post("/", async (request, response) => {
    console.log("POST");
    response.json({ status: "ok" });
  });
  
  // router to our apis 
  app.use("/api", router);