//plugins
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");
const cachegoose = require('cachegoose');

cachegoose(mongoose);
dotenv.config();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Lotto Result API',
      description: 'PCSO Lotto Result API Information',
      contact: {
        name: "JustAnotherDay"
      },
      servers: ['http://localhost:8080/api/v1']
    }
  },
  apis: ['./routes/*.js','./models/*.js'],
  explorer: true,
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

//services
const logger = require("./services/logger");
const pcso = require("./services/PcsoResult");

//routes
const resultsRoutes = require("./routes/result_route");
const categoriesRoutes = require("./routes/category_route");
const pcsoCrawlerRoutes = require("./routes/pcsocrawler_route");

//middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(morgan("dev"));
app.use("/results", resultsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/services", pcsoCrawlerRoutes);

//setup Database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "ERROR DB Connection : "));
 
db.once("open", function() {
  // we're connected!
  console.log("SUCCESS DB Connection");
});

app.listen(port, () => {
  console.log(`A Node JS is listening in port ${port}`);
});

