const mongoose = require("mongoose");

const dbUri = process.env.NODE_ENV === "test"
  ? process.env.MONGO_URI_TEST
  : process.env.MONGO_URI;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
