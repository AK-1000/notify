import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
);

app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);


app.use(function(req,res, next)
{
    res.setHeader("Content-Type", "application/json");
    next();
});

initializeApp({
  credential: applicationDefault(),
  projectId: 'akfirst-be144'
});


app.post("/send", function(req, res){
    const receivedToken = req.body.fcmToken;
    const message = {
        notification: {
            title: "Notif",
            body: "This is a Test Notification"
        },
        token: "eeTOymlmSCOfk3sc-iPy_I:APA91bFGpybfglhzq9gEOzqFlUFWpHKutu8FO3PFDq5AAERo9R6YJVs95dkw8FqvFQLkxNTigPh4sPSWkxvtImRbYd8bXo8x2qZlopQbPslQ2vZtdMzPoJct15qPIRcdO3MTUiCXYDvm",
    };

    getMessaging()
    .send(message)
    .then((response) => {
        res.status(200).json({
            message: "Successfully sent message",
            token: receivedToken,
        });
        console.log("Successfully sent message: ", response);
    })
    .catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error sending message: ", error);
    });
});

app.listen(3000, function(){
    console.log("Server Started on port 3000");
});