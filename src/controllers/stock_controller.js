//on stocke le chemin vers le fichier dans une constante pour pouvoir y accéder par cette dernière
const pathToData = ("./src/models/stock.json");
const fs = require ("fs");
// on crée la methode getAllStock qui va permettre de voir l'état du stock général ainsi que le total et on l'exporte directement pour pouvoir l'exporter
exports.getAllStock = (request, response) => {
//on lit le fichier où se trouve les données avec 2 arguments possibles data ou err, via la methode readfile du mmodule fs
    fs.readFile(pathToData, (err, data) => {
        // si la lecture du fichier échoue (argumment err), on renvoit en réponse un statut d'erreur 500 et un message pour l spécifier
        if (err) {
            response.status(500).json ({
                message: "La lecture du fichier a échoué!",
                error: err
            })
            //si la lecture réussit, on récupére les données du fichier que l'on convertit version JSON via la methode JSON.parse et on la stocke dans une data
        } else {
            const stock = JSON.parse(data).stock;
            response.status(200).json(stock)
        }
    })
};
//on met en place la methode pour récupérer le stock en utilisant la date et on l'exporte pour pouvoir l'exploiter
exports.getStockByRef = (request, response) => {
    fs.readFile(pathToData, (err, data) => {
        if (err) {
            response.status(500).json ({
                message : "La lecture du fichier a échoué!",
                error: err
            })
        } else {
            // on stock les données récupérées dans une constante 
            const dataToSearch = JSON.parse(data);
            // on va appliquer la methode find à data et précisément au tableau stock dans lequel sera effectué la recherche, le résultat sera stocké dans une constante
            const dataByRef = dataToSearch.stock.find (
                // la methode find va chercher à comparer la date recuperée via la methode request.params aux dates dans le fichier
                (obj) => obj.ref === parseInt(request.params.ref)
            )
            // si on retrouve des données relatives à la date, on renvoit un statut 200 avec les données récupérées
            if (dataByRef) {
                response.status(200).json(dataByRef)
                //sinon la recherche n'a rien donné, on renvoit donc un statut 404 avec un message pour informer de l'absence de données
            } else {
                response.status(404).json ({
                    message :"Aucun stock relatif à cette date n'a été trouvé!"
                })
            }
        }
    })
};
// on créé et on exporte en même temps la methode qui va permettre de de l'importer et de l'utiliser
exports.createStock = (request, response) => {
    // lecture du fichier
    fs.readFile(pathToData, (err, data) => {
        //si erreur statut 500 et message
        if (err) {
            response.status(500).json ({
                message: "Erreur lors de la lecture du fichier",
                error: err
            })
        } else {
            // si réussite, on récupère les datas que l'on stocke dans une constante
            const existingData = JSON.parse(data);
            //On va chercher dans existingData le dernier objet du tableau grâce à la methode findlast et on le stocke dans une variable
            const lastData = existingData.stock.findLast(
                (obj) => obj.ref
            )
            // on rajoute les données que l'on a récupéré via la methode request body du module Body parser
            existingData.stock.push({
                "ref": lastData.ref+1,
                "date": request.body.date,
                "hour": request.body.hour,
                "quantity": request.body.quantity,
                "unit": request.body.unit
            })
            //on écrase ensuite le fichier avec la nouvelle version qui contient les données récupérées
            fs.writeFile(pathToData, JSON.stringify(existingData), (writErr) => {
                // si l'écriture a échoué on revoit un statut 500 avec un message d'erreur
                if (writErr) {
                    response.status(500).json ({
                        message : "L'ajout a échoué !",
                        error: err
                    })
                    // sinon, cela signifie que la methode a abouti, on renvoit un statut 200 avec une réponse pour confirmer l'écriture
                } else {
                    response.status(200).json ({
                        message : "Le produit a été rajouté !"
                    })
                }
            })
        }
    })
};

exports.putData = (request, response) =>{
    fs.readFile(pathToData, (err, data) => {
        if (err) {
            response.status(500).json ({
                message :"erreur lors de la lecture du fichier",
                error: err
            })
        } else {
            const resumeStock = JSON.parse(data);
            const dataByRef = resumeStock.stock.find (
                (obj) => obj.ref === parseInt(request.params.ref)
            )
            if (!dataByRef) {
                response.status(404).json ({
                    message: "Aucun stock de cette date trouvée"
                })
            } else {
                dataByRef.date = request.body.date
                dataByRef.hour = request.body.hour
                dataByRef.quantity = request.body.quantity
                dataByRef.unit = request.body.unit
                fs.writeFile(pathToData, JSON.stringify(resumeStock), (writeErr) => {
                    if (writeErr) {
                        response.status(500).json ({
                            message: "La modification a échoué",
                            error : err
                        })
                    } else {
                        response.status(200).json ({
                            message : "Les modifications sont bien été enregistrées!"
                        })
                    }
                })
            }
        }
    })
}
    
exports.deleteStock = (request, response) => {
    fs.readFile(pathToData, (err, data) => {
        if (err) {
            response.status(500).json ({
                message : "Erreur lors de la lecture du fichier",
                error: err
            })
        } else {
            const donnees = JSON.parse(data);
            const stockByRef = donnees.stock.find(
                (obj) => obj.ref === parseInt(request.params.ref)
            )
            if (!stockByRef) {
                response.status(404).json ({
                    message : "Aucun stock à cette date n'a été trouvé",
                })
            } else {
                donnees.stock = donnees.stock.filter(
                    (obj) => obj.ref != parseInt(request.params.ref)
                )
                fs.writeFile(pathToData, JSON.stringify(donnees), (writeErr) => {
                    if (writeErr) {
                        response.status(500).json ({
                            message: "Erreur lors de la suppression du fichier",
                            error: err
                        })
                    } else {
                        response.status(200).json ({
                            message :"La suppression a été effectuée"
                        })
                    }
                })
            }
        } 
    })
    }






