import { MongoClient } from "mongodb";
import { uri } from './uri.js'
import cors from 'cors'
import  express  from "express";


//connect to mongo
const client=new MongoClient(uri)
const db = client.db('Facebook-part-two')
const collection=db.collection('messages')

//connet to express
const app = express()
const port = 4000
app.use(cors())
app.use(express.json())

app.get('/get',(req,res)=>{
     

        res.send("it worked")
  
}) 

app.post('/message', (req,res)=>{
    const newMessage=req.body
collection.insertOne(newMessage), (err,results)=>{
    if (err){
    res.status(500).json({error:true})
    }else{
        res.status(201).json(results)
        res.send('It worked')
    }

}
})

app.listen(port, ()=>{
    console.log("now running on", port)
})


