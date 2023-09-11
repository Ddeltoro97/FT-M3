var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;

/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports = http.createServer((req, res) =>{
  console.log(`Server raised in port ${PORT}`);
  if(req.url === "/api"){
    fs.readFile("./utils/dogsData.json", (err, data)=>{
      if(err){
      res.writeHead(404, {"content-type":"text/plain"});
      res.end("json not found");
    }
    else{
      res.writeHead(200, {"content-type":"application/json"});
      res.end(data);
    }
    });
    return;
  }

  if(req.url ==="/allDogs"){
    fs.readFile("./utils/allDogs.html", "UTF8", (err, data)=>{
      if(err){
        res.writeHead(404, {"content-type":"text/plain"});
        res.end("html not found");
      }
      else{
        res.writeHead(200, {"content-type":"text/html"});
        res.end(data);
      }
    });
    return;
  }
        res.writeHead(404, {"content.type":"text/plain"});
        res.end("route not found");
})

  .listen(PORT);
//!Si vas a probar con thunderClient eliminar el localhost
      // .listen(PORT, "localHost");
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */

