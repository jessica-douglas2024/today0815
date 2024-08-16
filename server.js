const mongoose = require('mongoose');

const express = require('express')
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const URL = "mongodb+srv://user1:user1@cluster0.jw9cuev.mongodb.net/ActivityDB";


const Schema = mongoose.Schema;

const activitySchema = new Schema({
      activity: { type: String, required: true },
      
    });
    
const Activity = mongoose.model("Activity", activitySchema);

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true,})
.then (()=>{
    console.log("Connected to MongoDB!!!!")
})
.catch ((err)=>{
    console.log(err)
})

app.get('/', (req, res) => {
        res.sendFile(__dirname + "/form.html")
    });

app.post('/', async (req,res)=>{
    

    const activity = req.body.myactivity;
    const newActivity = new Activity({activity,});
    await newActivity.save()
        .then(res.send(`<h1>Document  Added</h1>`))
        .catch((err)=>{res.status(400).json('error: '+err)})
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});