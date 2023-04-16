const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  var data =
  {
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/30edf6aee2";
  const options=
  {
    method:"POST",
    auth: "shivank1:069b92fbd68bcc5649b22fde519bdf39-us17"
  }


  const request = https.request(url, options , function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/sucess.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req, res){
  res.redirect("/")

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running at port 3000");
})
//Api id
//069b92fbd68bcc5649b22fde519bdf39-us17
//listid
//30edf6aee2
