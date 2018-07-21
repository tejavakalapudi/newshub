//http://expressjs.com/
const express = require( "express" );
const nodemailer = require( "nodemailer" );
const app  = express();
const path = require( "path" );
const publicPath = path.join( __dirname, "..", "public" );
const port = process.env.PORT || 3000;

//http://masashi-k.blogspot.com.br/2013/06/sending-mail-with-gmail-using-xoauth2.html
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type : "OAuth2",
        user: 'akruthiiconstructions@gmail.com',
        pass: 'akruthi@9',
        clientId : "972811879269-422bs9d6bbspqgoedspotjj8gbbdu14c.apps.googleusercontent.com",
        clientSecret : "JYpxFm3KkgJ19sJog1XgpQQd",
        refreshToken : "1/87V5aJHYlksZQfhHDTXr4DiAWAyDSUBHgjyyX-o9YC6MTqAJO7rSbwRzaqKY3xxy"
    }
});

app.use( express.static( publicPath ) );

app.get( "/sendemail", ( req, res ) => {

    console.log("Making post request to send email", req.query );

    const messageString = `<h3>${req.query.name} wrote: </h3>
    <p><i>"${req.query.message}"</i></p>
    <div><b>Customer Details:</b></div>
    <div><b>Phone:</b> ${req.query.phone}</div>
    <div><b>Email:</b> ${req.query.email}</div>
    <div><b>Interested Project:</b> ${req.query.interestedProject}</div>
    <div><b>Preferred Date:</b> ${req.query.preferredDate}</div>`;

    const mailOptions = {
        from: 'akruthiiconstructions@gmail.com',
        to: 'vakalapudi.ravikiran@gmail.com',
        subject: `Message from ${req.query.name}`,
        html: messageString
    };
    
    transporter.sendMail( mailOptions, ( error, info ) => {

        if ( error)  {

          console.log( "Nodemailer failed with ", error );

          res.status( 500 ).send( { error: 'Something failed!' } );

        } else {

        console.log( "Nodemailer successfully sent an email" );

          res
            .status( 200 )
            .send("Email has been sent successfully");
        }
        
    });

});

app.get( "*", ( req, res ) => {
    res.sendFile( path.join( publicPath, "index.html" ) );
});


app.listen( port, () => {
    console.log( "Server is up!" );
});