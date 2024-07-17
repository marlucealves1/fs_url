import fs from "node:fs"
import { callbackify } from "node:util";

const lerDadosReceita = () => {
 fs.readFile('receitas.json', "utf-8",(err,data)=>{
    if(err){
        callback(err)
    }
    try {
        const receitas = JSON.parse(data)
        callback(null,receitas)
    } catch (error) {
        callback(error)
    }
 })
}

export default lerDadosReceita;