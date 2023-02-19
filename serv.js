//On récupère le fichier app que l'on stocke dans une constante
const app = require("./app");
//On stock le port du serveur dans une constante
const port = 3000
// On demande à Express d'exposer tout son contenue enregistré sur le port 3000 du serveur qui accueil l'application
app.listen(port, () => {
    console.log("l'application tourne bien au port 3000")
})