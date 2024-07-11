const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}....`);
});

mongoose
  .connect("mongodb+srv://elle322002:nhoem13579@mycluster.brp0arg.mongodb.net/nienluan?retryWrites=true&w=majority&appName=myCluster", {
    family: 4,
  })
  .then(() => {
    console.log('Connect to database');
  })
  .catch((error) => {
    console.error(error);
  });

