const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
 const firstName=req.body.fname;
 const lastName=req.body.lname;
 const email=req.body.email;

 const data={
 	members:[
 	{
 		email_address:email,
 		status:"subscribed",
 		merge_fields:{
 			FNAME:firstName,
 			LNAME:lastName

 		}

}
 	
 	]
 };
 const jsonData=JSON.stringify(data);
 const url="https://us10.api.mailchimp.com/3.0/lists/be7422ed24";
 const option={
 	method:"POST",
 	auth:"shalaj:4af7a0f96576346733ab070ad834730d-us10"
 };
const request= https.request(url,option,function(response){
	if(response.statusCode===200){
		res.sendFile(__dirname+"/success.html");
	}
	else{
		res.sendFile(__dirname+"/failure.html");	}
 	response.on("data",function(data){
 		console.log(JSON.parse(data));
 	});
 	});
 	// request.write(jsonData);
 	request.end();

 

 

});

app.post("/failure",function(req,res){
	res.redirect("/");
});
app.listen(3000,function(req,res){
	console.log("server is running on 3000");
});