// const express = require("express");
// const mongoose = require("mongoose");
// const connectToDatabase = require('./dbConnect');
// const getRoutes = require("./routes/getRoutes");
// // const commentRoutes = require("./routes/commentRoutes");

// const port = 3000;
// const app = express();
// app.use(express.json());


// app.get('/', (req, res)=>{
//   res.send("hello from index page")
// })

// app.use('/', getRoutes);
// // app.use('/', commentRoutes);

// mongoose.set("strictQuery", false);

// connectToDatabase()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`App listening on port ${port}`);
//     });
//   })
//   .catch(err => {
//     console.error('Error connecting to database:', err);
//     process.exit(1);
//   });


//   module.exports = app;









const express = require("express");
const mongoose = require("mongoose");
const connectToDatabase = require('./dbConnect');
const getRoutes = require("./routes/getRoutes");
const cors = require("cors"); // Import cors

const port = 3000;
const app = express();

// Configure CORS
app.use(cors({
  origin: "https://hotel-backend-xi.vercel.app",
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello from index page");
});

app.use('/', getRoutes);

mongoose.set("strictQuery", false);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });

module.exports = app;
