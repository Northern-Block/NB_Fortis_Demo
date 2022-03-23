const express=require('express')
const cors=require('cors')
const port=3005
const {mongoose}=require('./config/database')
const {routes}=require('./config/routes')


const app=express()



app.use(express.json())
app.use(cors())
app.use('/fortis',require('./config/routes'));


app.listen(port,()=>{
    console.log('lisiting on port',port)
})