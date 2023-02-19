// je déclare la constante qui contiendra l'export du module express
const express = require ("express");
// Création de la constante app qui va lancer l'application express
const cors = require ("cors");
const app = express();
app.use(cors())
// recupération du module body-parser que l'on stocke dans une constante
const bodyParser = require ("body-parser");
// on permet à app d'utiliser la constante bodyParser
app.use(bodyParser.json())

// on stocke le chemin qui contient les différrentes des methodes dans une constante
const stockRoute = require ("./src/routes/stock_route");
//Route test pour vérifier que tout va bien sur la route http://localhost:3000/
app.get("/",  (request, response) => {
    response.send("Ça fonctionne!!")
});
//on permet a app d'utiliser la constante stockRoute
app.use(stockRoute)
//exportation de l'appli app pour pouvoir être exploitée ailleurs
module.exports = app;