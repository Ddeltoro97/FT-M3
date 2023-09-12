const express = require("express");
const morgan = require('morgan');

let publications = [];

const server = express();

server.use(express.json());
server.use(morgan('dev'));

let id = 0;
server.post('/posts', (req, res) =>{
    if (req.body.author && req.body.title && req.body.contents){
        const publicacion ={
            id: ++id,
            author: req.body.author,
            title: req.body.title,
            contents: req.body.contents
        }
        publications.push(publicacion);
        return res.json(publicacion);
    }
    else{
        return res.status(400).json({error: "No se recibieron los parámetros necesarios para crear la publicación"})
    }
})

server.get("/posts", (req, res) =>{
  const author = req.query.author;
  const title = req.query.title;

  const tienenAmbos = publications.filter((publication) => publication.author === author && publication.title === title);

  if (tienenAmbos.length === 0){
    return res.status(400).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
  }

  return res.json(tienenAmbos);
})

server.get("/posts/:author", (req, res) =>{
  const {author} = req.params;
  const publiAuthor = publications.filter((publication) => publication.author === author);
  
  if(publiAuthor.length){
    return res.status(200).json(publiAuthor);
    
  }
  else{
    return res.status(400).json({error: "No existe ninguna publicación del autor indicado"});
  }
  
})

server.put("/posts/:id",(req, res) =>{
    const {id} = req.params;

    if (req.body.title && req.body.contents){

    }
    else{
        return res.status(400).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"})
    }

    for(let i = 0; i < publications.length; i++){
        if (+id === publications[i].id){
            publications[i] = {
                ...publications[i],
                title: req.body.title,
                contents: req.body.contents
            }
            return res.status(200).json(publications[i])
        }
    }

    return res.status(400).json({error: "No se recibió el id correcto necesario para modificar la publicación"})


})

server.delete(`/posts/:id`, (req, res) => {
    const {id} = req.params;

    if (!id) return res.status(400).json({error: "No se recibió el id de la publicación a eliminar"});

    for(let i = 0; i < publications.length; i++){
        if (publications.id == id){
           publications.splice(i, 1);
           return res.status(200).json({ success: true }) 
        }
    }

    return res.status(400).json({error: "No se recibió el id correcto necesario para eliminar la publicación"})

})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
