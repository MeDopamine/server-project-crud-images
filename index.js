const express = require("express");
const router = require("./routes/router.js");
const cors = require("cors")
const fileUpload = require("express-fileupload")

const app = express();
const port = 5000;

app.use(cors()); //cors harus di atas agar bisa diakses
app.use(fileUpload());
app.use(express.json());
app.use(express.static("public"))
app.use(router);

app.listen(port, () => console.log(`Server running on port ${port}`));
