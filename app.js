//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public")); //
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req , res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req , res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.mail;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/468a37e534"

  const options = {
    method: "POST",
    auth: "charan:4aa00c47ebbff381ac2d6f092de16ccb-us21"

  }


  const request = https.request(url , options , function(response){

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/sucess.html")
    } else{
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
    //request.write(jsonData);
    request.end();


});

app.post("/failure", function(req ,res){

  res.redirect("/");
});


//api keys
// 4aa00c47ebbff381ac2d6f092de16ccb-us21   40790166a3224f66330f7a1d940c5d5e-us21

//list_id
//468a37e534.


app.listen(5000, function(){
  console.log("server is running on port 5000 ");
})
