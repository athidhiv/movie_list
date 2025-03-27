const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');


const followRoutes = require("./routes/followUser.js"); 
const userRoutes = require("./routes/user.js");
const movielistRoutes = require("./routes/movielist.js");
const imdbRoutes = require("./apis/imdb.js");
const ombdRoutes = require("./apis/omdb.js");
const db = require('./db.js');
const app = express();

app.use(cors());
app.use(express.json());
app.get("/popular",(req,res)=>{
    db.query("SELECT poster FROM movies ORDER BY num_votes DESC",(err,result)=>{
        if (err) return res.status(500).send(err);
    res.json(result.map(row => row.poster));
  });
});
app.use("/user", followRoutes);
app.use("/user", userRoutes);
app.use("/imdb", imdbRoutes);
app.use("/ombd", ombdRoutes);
app.use("/user", movielistRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
