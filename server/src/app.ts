import express from "express"
import * as fs from "fs"
import * as fileupload from "express-fileupload"
import * as uuid from "uuid"
import  { Request, Response } from "express"
import { myDataSource,dataSourceInit } from "./data-source/app-data-source"
import { User } from "./entity/user.entity"
import * as path from "path"
import { fileURLToPath } from "url"
// const upload = multer.default()
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export function bootstrap(){
const PORT = process.env.PORT || 3000

dataSourceInit()
const app = express()
app.use(express.json())
app.use(fileupload.default({}))
const staticPath = path.resolve(__dirname, 'images')
app.get('/images/:name',async function (req: Request, res: Response){
    const name = req.params.name
    let imagePath = path.join(staticPath,name)
   const imageExist = fs.existsSync(imagePath)
   if(!imageExist) imagePath = path.join(staticPath,'fish.jpeg')
res.sendFile(imagePath)
})

const saveFile = async(file:fileupload.UploadedFile)=>{
    try {
       const type = file.mimetype.split("/")[1]
console.log(type);


const fileName = uuid.v4() +'.'+ type
const filePath = path.resolve(staticPath,fileName)
file.mv(filePath) 
return fileName
    } catch (error) {
        throw new Error(error)
    }

}
app.post('/images/:id',async(req: Request, res: Response)=>{
    const user = await myDataSource.getRepository(User).findOneBy({id:+req.params.id ?? 1})
if(req.files && user) {
  const profileImage = await saveFile(req.files['image'])
user.profileImage = profileImage
 await myDataSource.getRepository(User).save(user)

}


return res.send(user)

})
// app.use('/static',express.static(staticPath))

app.get("/users",async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    return res.send(users)
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