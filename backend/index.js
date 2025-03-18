const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const { authMiddleware } = require("./middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/api/v1", mainRouter);

app.listen(3001, () => {
  console.log("server is running at port 3001");
});
