const express = require("express");
const cors = require("cors");
const articlesRoutes = require("./routes/articles"); // מייבא את הראוטר

const app = express();
app.use(cors());
app.use(express.json()); // מאפשר לקרוא נתוני JSON מהבקשות

// שימוש בראוטר עבור /articles
app.use("/articles", articlesRoutes);

// מאזין ב port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
