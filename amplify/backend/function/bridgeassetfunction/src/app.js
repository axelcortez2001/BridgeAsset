/* Amplify Params - DO NOT EDIT
	API_BRIDGEASSETAPI_APIID
	API_BRIDGEASSETAPI_APINAME
	AUTH_BRIDGEASSET_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/
//connect to database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "BridgeAssets",
});
const assetSchema = new mongoose.Schema({
  item: { type: String },
  FA_code: { type: String },
  serial_number: { type: String },
  supplier: { type: String },
  inventory_field: { type: String },
  last_updated: { type: String },
  unit_price: { type: Number },
  dop: { type: String },
  ytd: { type: String },
  warranty_period: { type: String },
  lifespan_status: { type: String },
  warranty_status: { type: String },
  status: { type: String },
  asset_holder: {},
});
const AssetModel = mongoose.model("Assets", assetSchema);

// define a route handler for the default home page
app.get("/assets", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/assets", async (req, res) => {
  const { assetData } = req.body;
  try {
    const asset = new AssetModel(assetData);
    await asset.save();
    res.status(200).json({ success: true, asset });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/assets", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/assets", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
