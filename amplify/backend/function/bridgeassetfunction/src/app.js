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
const rateLimit = require("express-rate-limit");

const mongoURI = process.env.MONGODB_URI;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: "Too many requests, please try again later." },
});
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(limiter);
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
  fa_code: { type: String },
  serial_number: { type: String },
  supplier: {},
  inventory_filed: { type: Date, default: Date.now() },
  last_updated: { type: Date, default: Date.now() },
  unit_price: { type: Number },
  doi: { type: String, default: Date.now() },
  dop: { type: String },
  warranty_period: { type: String },
  //ytd:  year to date, based from DOP
  // lifespan_status: IF({YTD}>3, "FOR ASSESSMENT", "GOOD")
  // warranty_status: IF({YTD}>warranty_period, "OUT OF WARRANTY", "WARRANTY")
  status: {},
  branch: { type: String },
  asset_holder: {},
  asset_history: [],
  asset_holder_history: [],
  user_type: { type: String, default: "" },
  category: { type: String },
  item_stats: { type: String },
  remarks: { type: String },
  tagCode: { type: String },
  //data
});
const AssetModel = mongoose.model("Assets", assetSchema);

// define a route handler for the default home page
app.get("/assets", async (req, res) => {
  try {
    const asset = await AssetModel.find();
    if (!asset) {
      return res
        .status(404)
        .json({ success: false, message: "Assets Unavailable" });
    } else {
      res.json({ success: true, message: "Assets Found", response: asset });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", response: error });
  }
});

app.get("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/assets", async (req, res) => {
  const assetData = req.body;
  try {
    if (!assetData) {
      return res
        .status(400)
        .json({ success: false, error: "No asset data provided" });
    } else {
      const asset = await AssetModel.create(assetData);
      res.status(200).json({ success: true, response: asset });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", response: error });
  }
});

app.post("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/
app.put("/assets", async (req, res) => {
  const assetData = req.body;
  const id = assetData._id;
  try {
    if (!assetData) {
      return res
        .status(400)
        .json({ success: false, error: "No asset data provided" });
    } else if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    } else {
      const updatedAssetData = await AssetModel.findByIdAndUpdate(
        { _id: id },
        { $set: assetData },
        { new: true }
      );
      res.status(200).json({ success: true, response: updatedAssetData });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", response: error });
  }
});

app.put("/assets/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/
app.delete("/assets", async (req, res) => {
  const _id = req.query;
  if (!_id) {
    return res
      .status(400)
      .json({ success: false, error: "No asset data or ID provided" });
  }
  try {
    const deletedAssetData = await AssetModel.deleteOne({ _id: _id });
    if (!deletedAssetData) {
      return res.status(404).json({ success: false, error: "Asset not found" });
    }
    res.status(200).json({ success: true, response: deletedAssetData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      response: error.message,
    });
  }
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
