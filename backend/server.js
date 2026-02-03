const app = require("./app");
const mongoConnect = require("./config/db");
require("dotenv").config({ path: ".env.dev" });
const PORT = process.env.PORT || 3000;

mongoConnect()
  .then(() => {
    app.listen(PORT, (error) =>
      error
        ? console.log(error)
        : console.log(`Server is running at http://localhost:${PORT}`),
    );
  })
  .catch((error) => {
    console.log(`DB connection error `, error);
  });
