import express from "express";

const app = express();
const PORT:number = 3000;

app.get('/', (req,res) => {
  res.send("welcome to typescript backend")
});

app.listen(PORT,() => {
  console.log(`the backend is listening on port http://localhost:${PORT}`);
});