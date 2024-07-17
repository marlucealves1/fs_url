import {createServer} from "node:http";
import fs from "node:fs"
import {v4 as uuidv4} from "uuid"
import { URLSearchParams } from "node:url";

import lerDadosReceitas from "./helper/lerReceitas.js"
import lerDadosReceita from "./lerReceitas";
import { URLSearchParams } from "node:url";

const PORT = 3333

const server = createServer((resquest, response) => {
   const {url, method} = resquest;
 //#01 - adicionar a rota GET receitas com essas 
   if(method === 'GET' && url === '/receitas'){
    lerDadosReceita((err,receitas)=>{
        if(err){
        response.writeHead(500,{"Content-Type" : "aplication/json"})
        response.end(JSON.stringify({message:"Erro ao ler dados"}))
        return
        }
        //imprimir o resultado 
        response.writeHead(200,{"Content-Type" : "aplication/json"})
        response.end(JSON.stringify(receitas))
    })
   }else if(method === 'POST' && url === '/receitas'){
    
   }else if(method === 'GET' && url.startsWith('/receitas/')){
    
   }else if(method === 'PUT' && url.startsWith('/receitas/')){
    
   }else if(method === 'DELETE' && url.startsWith('/receitas/')){
    
   }else if(method === 'GET' && url.startsWith('/categorias/')){
    
   }else if(method === 'GET' && url.startsWith('/busca')){
    //localhost:3333/busca?termo=cebola
    const urlParams = new URLSearchParams(url.split("?")[1])
    const termo = urlParams.get("termo")
    console.log(termo)
    lerDadosReceita((err, receitas)=>{
      if(err){
        response.writeHead(500,{'Content-Type' : 'application/json'})
        response.end(JSON.stringify({messge:"Erro ao ler dados das receitas"}))
        return
      }

      const resultado = receitas.filter((receita) =>
      receita.nome.includes(termo) ||
      receita.categoria.includes(termo) ||
      receita.ingredientes.some((ingrediente) =>
      ingrediente.includes(termo)
      )
      
      ) ;
      if(resultado.lenght === 0){
        response.writeHead(404,{"Content_Type" : "application/json"})
        response.end(JSON.stringify({message:"Nao encontrado uma receita com o termo"+termo}))
        return
      }
      response.writeHead(200, {"Content_Type" : "application/json"})
      response.end(resultado)
    })
    
   }else if(method === 'GET' && url.startsWith('/ingredientes')){
    
   }else {
    response.writeHead(404, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({message: 'Página não encontrada'}))
   }
})

server.listen(PORT, () => {
    console.log(`http//localhost:${PORT}`)
})
