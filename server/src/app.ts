import express from "express"
import  { Request, Response } from "express"
import { myDataSource,dataSourceInit } from "./data-source/app-data-source"
import { User } from "./entity/user.entity"
export function bootstrap(){
const PORT = process.env.PORT || 3000

dataSourceInit()
const app = express()
app.use(express.json())


app.get("/users",async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id",async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({id:+req.params.id ?? 1})
return res.send(user)
})

app.post("/users",async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id",async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: +req.params.id,
    })
    if(!user) throw new Error("user not found")
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id",async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

// start express server
app.listen(PORT,()=>{
    console.log(`server start on port:${PORT}`);
    
})

}
bootstrap()