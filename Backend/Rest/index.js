const express = require("express");
const cors = require("cors"); 

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
});