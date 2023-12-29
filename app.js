const express = require("express");
const app = express();
const router = require("./routers");
const port = 3000;
const path = require("path");


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/grafik", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "grafik.html"));
});

app.get('/bundle.js', function(req, res) {
  res.header('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/bundle.js');
});




app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});