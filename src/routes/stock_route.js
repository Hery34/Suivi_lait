// on stocke le module express que l'on importe dans une constante pour pouvoir l'utiliser
const express = require ("express");
//On stocke la fonction express.Router dont on va avoir besoin dans une constante, on va l'utiliser pour créer des routes et gérer les requêtes
const router = express.Router();
// on stocke dans une constante le chemin d'accès où seront stockées le chemin d'accès au controller où les différentes méthodes seront créées
const stock_controller = require ("../controllers/stock_controller");

//on crée ensuite les différentes routes par lesquelles seront executées les différentes methodes.
router.get("/stock", stock_controller.getAllStock);
router.get("/stock/:ref", stock_controller.getStockByRef);
router.post("/stock", stock_controller.createStock);
router.put("/stock/:ref", stock_controller.putData);
router.delete("/stock/:ref", stock_controller.deleteStock);


module.exports = router