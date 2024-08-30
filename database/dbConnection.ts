import { connect } from "mongoose";


export function dbConnection(){
    connect("mongodb://localhost:27017/Upvote").
    then(()=>{
        console.log("Database Connected Successfully");
    }).catch(()=>{
        console.log("Database Error");
    })
}