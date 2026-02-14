const express = require("express");
const app =express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
 
const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";

//for database
async function main() {
    try {
      await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to DB");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
  
  main();

  app.set("view engine" , "ejs");
  app.set("views", path.join(__dirname,"views"));
  app.use(express.urlencoded({extended : true}));
  app.use(methodOverride("_method"));
  app.engine('ejs', ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));
  app.use(express.static('public'));




app.get("/testListing" ,(req,res) =>{
  res.render('listings/index');
});


//index route
app.get("/listings" , async (req , res) =>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs" , {allListings});
    
});

//new route (to get form)
app.get("/listings/new" , (req , res) =>{
  res.render("listings/new.ejs")
});

//show route
app.get("/listings/:id" , async  (req , res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs" ,{listing});

});

//create route (to post form into listings)

app.post("/listings" , async (req , res) => {
  // let {title ,description , image , price , location , country} = req.body;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
 });

 //edit route (edit indivisual listings)

app.get("/listings/:id/edit" , async (req , res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs" , {listing});
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;

  const updatedListing = await Listing.findByIdAndUpdate(id, {
    title: req.body.listing.title,
    description: req.body.listing.description,
    image: {
    url: req.body.listing.image.url
  }
  });
  res.redirect(`/listings/${id}`);
});


//delete route
app.delete("/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/listings");
    } catch (e) {
        console.log(e);
        res.send("Error deleting listing");
    }
});




// app.get("/testListing",async (req,res) => {
//    let sampleListing = new Listing({
//     title :"my new villa",
//     description : "by the beach",
//     price :1500,
//     location :"calangute , Goa",
//     country : "India",
//    }); 

//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful testing");
// });



app.listen(8080,() =>{
    console.log("server is listening to port 8080");
});

console.log('Views Directory:', path.join(__dirname, 'views'));