let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let multer = require("multer");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;
let url = "mongodb://admin:password1@ds341825.mlab.com:41825/tolemeio";
let dbs = undefined;
let cors = require("cors");
app.use(cors());
app.use(express.static(__dirname + "/images"));

MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  // We will not call connect any more
  if (err) throw err;
  dbs = allDbs.db("tolemeio");
});

let generateId = function() {
  return "" + Math.floor(Math.random() * 10000000);
};

let sessions = {};

let upload = multer({ dest: __dirname + "/images/" });

// function isAvailable(bookingRange, listing) {
//   const { from, to } = bookingRange;
//   return !listing.bookings.some(
//     booking => from >= booking.from && to <= booking.to
//   );
// }

app.post("/addListing", upload.array("productImage", 12), (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.files);

  let name = req.body.name;
  let address = req.body.address;
  let zipCode = req.body.zipCode;
  let city = req.body.city;
  let rates = JSON.parse(req.body.rates);
  let description = req.body.description;
  let amenities = JSON.parse(req.body.amenities);
  let numberOfBedrooms = req.body.numberOfBedrooms;
  let numberOfbathrooms = req.body.numberOfBathrooms;
  console.log("req.file.originalname", req.files);

  //   let extensions = req.files.map(e => {
  //     console.log("e", e.originalname);
  //     return e.originalname.split(".").pop();
  //   });
  //   console.log("extensions", extensions);

  //   console.log("rate", rate);
  //   let pictureFiles = req.files.map((e, index) => {
  //     return e.filename + "." + extensions[index];
  //   });
  let pictureFiles = req.files.map(file => {
    console.log(file, "file");
    let extension = file.originalname.split(".").pop();
    let oldFilename = file.path;
    let newFilename = file.path + "." + extension;
    fs.rename(oldFilename, newFilename, () => {});
    console.log("newFilename", newFilename);
    return file.filename + "." + extension;

    //  return oldFilename, newFilename+ "." + extensions; ()=>{}
  });
  let storeListings = {
    name,
    address,
    zipCode,
    city,
    rates,
    description,
    amenities,
    numberOfBedrooms,
    numberOfbathrooms,
    pictureFiles,
    bookings: []
  };
  //   console.log("storeListings", storeListings);
  //   console.log("req.files", req.files);
  // fs.rename(req.files.path, req.files.path + "." + extension, () => {});

  //   fs.rename(
  //   return path, e.path+ "."+ extensions[index];()=>{}}});

  dbs.collection("listings").insertOne(storeListings);

  res.send(JSON.stringify({ success: true }));
});

app.get("/listings", (req, res) => {
  dbs
    .collection("listings")
    .find()
    .limit(9)
    .toArray((err, result) => {
      if (err) {
        res.send(JSON.stringify({ msg: err, success: false }));
      } else {
        res.send(JSON.stringify({ listings: result, success: true }));
      }
    });
});

app.get("/listings/:city", (req, res) => {
  const city = req.params.city;
  dbs
    .collection("listings")
    .find({ city })
    .toArray((err, result) => {
      if (err) {
        res.send(JSON.stringify({ msg: err, success: false }));
      } else {
        res.send(JSON.stringify({ listings: result, success: true }));
      }
    });
});

app.get("/listing/:listingId", (req, res) => {
  const listingId = req.params.listingId;
  dbs
    .collection("listings")
    .find({ _id: ObjectId(listingId) })
    .toArray((err, result) => {
      if (err) {
        res.send(JSON.stringify({ msg: err, success: false }));
      } else {
        res.send(JSON.stringify({ listing: result, success: true }));
      }
    });
});

app.use(bodyParser.raw({ type: "*/*" }));
//this endpoint is for singing up
app.post("/signup", (req, res) => {
  console.log("initial input", req.body.toString());
  let parsedBody = JSON.parse(req.body);
  console.log(parsedBody);
  let firstName = parsedBody.firstName;
  let lastName = parsedBody.lastName;
  let password = parsedBody.password;
  let emailAddress = parsedBody.emailAddress;
  let sessionId = generateId();
  sessions[sessionId] = emailAddress;

  console.log("emailAddress", emailAddress, "password", password);
  let storedbody = {
    firstName,
    lastName,
    password,
    emailAddress: emailAddress
  };
  dbs
    .collection("owners-accounts")
    .find({ emailAddress: emailAddress })
    .toArray((err, result) => {
      if (result.length === 0) {
        dbs.collection("owners-accounts").insertOne(storedbody);
        res.send(JSON.stringify({ success: true, sid: sessionId }));
      } else {
        console.log("Email Address already exists");
        res.send(JSON.stringify({ success: false }));
      }
    });
});

app.post("/login", (req, res) => {
  console.log("initial input", req.body.toString());
  let parsedBody = JSON.parse(req.body);
  console.log("I am in the login endpoint");
  let emailAddress = parsedBody.emailAddress;
  let password = parsedBody.password;
  console.log("emailAddress", emailAddress, "password", password);

  let sessionId = generateId();
  sessions[sessionId] = emailAddress;

  let storedbody = { emailAddress, password };
  dbs
    .collection("owners-accounts")
    .find(storedbody)
    .toArray((err, result) => {
      console.log("err", err, "result", result);
      if (result.length === 0) {
        console.log("No result found");
        res.send(JSON.stringify({ success: false }));
      } else {
        console.log("result found: ", result);
        res.send(JSON.stringify({ success: true, sid: sessionId }));
      }
    });
});

app.get("/viewlistings", (req, res) => {
  dbs
    .collection("property-listings")
    .find({})
    .toArray((err, result) => {
      console.log("result", result);
      console.log("err", err);
      res.send(JSON.stringify({ success: true, result }));
    });
});
app.post("/search", (req, res) => {
  let parsedBody = JSON.parse(req.body);
  console.log("parsedBody", parsedBody);
  let query = {
    city: {
      $regex: ".*" + parsedBody.city + ".*"
    },
    rates: {
      $elemMatch: {
        startDate: { $gte: parsedBody.from },
        endDate: { $lte: parsedBody.to }
      }
    }
  };
  console.log("query", JSON.stringify(query));
  dbs
    .collection("listings")
    .find(query)
    // .find({ itemDescription: `/${parsedBody.itemDescription}/i` })
    .toArray((err, result) => {
      console.log("result", result);

      res.send(JSON.stringify({ success: true, result }));
    });
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
