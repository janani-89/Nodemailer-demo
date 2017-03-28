var express = require('express');
var nodemailer = require('nodemailer');

//app init
var app = express();

var smtpTransport = nodemailer.createTransport({
	service:"gmail",
	host:"smtp.gmail.com",
	auth: {
		user:"",
		pass:""
	}
});
app.get('/',function(req,res){
res.sendfile('index.html');
});
app.get('/send',function(req,res){
	var mailOptions ={
		to:req.query.to,
		subject:req.query.subject,
		text:req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions,function(err,response){
		if(err){
			console.log(err);
			res.end("err");
		}else{
			console.log("message sent"+response.message);
			res.end("sent");
		}
	});
});

app.listen(3000,function(){
	console.log("express started on port 3000");
})