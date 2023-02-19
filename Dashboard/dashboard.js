$(document).ready(() => {
    // on stocke dans une constante l'adresse de l'api
    const apiBaseUrl = "http://localhost:3000/"
    // création de la fonction pour rajouter du stock
    function rajoutStock() {
        // création de la constante qui permettra de récupérer le contenu qui a été saisi et que l'on veut créer
        const date = $("#date").val();
        const hour = $("#hour").val();
        const quantity = $("#quantity").val();
        const unit = $("#unit").val();
        const data = {
            date : date,
            hour : hour,
            quantity : quantity,
            unit : unit
        }
        // on appelle ajax
        $.ajax({
    //         // on rentre les paramètres d'ajax , en précisant d'abord le type de requête
            type: "POST",
    //         // on rajoute à l'api, la route exacte du fichier où l'on veut rajouter l'objet
            url: apiBaseUrl + "stock",
    //         // on rentre les données que l'on convertit au format JSON et on rentre dedans la constante
            data: JSON.stringify(data),
    //         // on renseigne ensuite le type de contenu
            contentType : "application/json; charset=utf-8",
    //         // on précise aussi le type de données
            dataType : "json",
    //         // on paramètre le comportement en cas de succcès
            success: (result) => {
                verifierStock()
    //             // là, il s'agit de faire un console log du resultat et une petite alerte qui récupère les messages paramétrés dans le controller
                console.log(result);
                alert(result.message)
            },
    //         // en cas d'erreur
            error : (xhr, status, error) => {
                console.log(xhr);
                console.error(status);
                console.log(error);
                alert("status: " + status + "error: " + error)
            }
        })
    }
    function verifierStock() {
        $.ajax({
            // on rentre les paramètres d'ajax , en précisant d'abord le type de requête
            type: "GET",
            // on rajoute à l'api, la route exacte du fichier où l'on veut lire les objets
            url: apiBaseUrl + "stock",
            // on renseigne ensuite le type de contenu
            contentType : "application/json; charset=utf-8",
            // on précise aussi le type de données
            dataType : "json",
            // on paramètre le comportement en cas de succcès
            success: (result) => {
                // là, il s'agit de faire un console log du resultat et une petite alerte qui récupère les messages paramétrés dans le controller
                console.log(result);
                let html = ""; 
                result.forEach(obj => {
                    html += "<tr>" + "<td>" + obj.ref + "</td>" + "<td>" + obj.date + "</td>" + "<td>"+ obj.hour + "</td>" + "<td>" + obj.quantity + obj.unit + "</td>";
                });
                $("#affichage").html(html);
            },
            // en cas d'erreur
            error : (xhr, status, error) => {
                console.log(xhr);
                console.error(status);
                console.log(error);
                alert("status: " + status + "error: " + error)
            }
        })
    }
    function updateStockByRef() {
    //      //On crée la constante où sera stockée la valeur de l'id que l'on veut récupérer
        const refItem = $("#ref_change").val();
        const date = $("#date_change").val();
        const hour = $("#hour_change").val();
        const quantity = $("#quantity_change").val();
        const unit = $("#unit_change").val();
        const data = {
            date : date,
            hour : hour,
            quantity : quantity,
            unit : unit
        }        
        $.ajax({
    //         // on rentre les paramètres d'ajax , en précisant d'abord le type de requête
            type: "PUT",
    //         // on rajoute à l'api, la route exacte du fichier où l'on veut lire les objets
            url: apiBaseUrl + "stock/" + refItem,
    //         // on renseigne ensuite le type de contenu
            contentType : "application/json; charset=utf-8",
    //         // on passe les datas dans le body
            data: JSON.stringify(data),
    //         // on précise aussi le type de données
            dataType : "json",
    //         // on paramètre le comportement en cas de succcès
            success: (result) => {
    //             // là, il s'agit de faire un console log du resultat et une petite alerte qui récupère les messages paramétrés dans le controller
                verifierStock()
                console.log(result);
                alert(result.message)
            },
    //         // en cas d'erreur
            error : (xhr, status, error) => {
                console.log(xhr);
                console.error(status);
                console.log(error);
                alert("status: " + status + "error: " + error)
            }
        })
    }
    function deleteStockById() {
    //    On crée la constante où sera stockée la valeur de l'id que l'on veut récupérer
        const refItem = $("#ref_delete").val();
        $.ajax({
    //         // on rentre les paramètres d'ajax , en précisant d'abord le type de requête
            type: "DELETE",
    //         // on rajoute à l'api, la route exacte du fichier où l'on veut lire les objets
            url: apiBaseUrl + "stock/" + refItem,
    //         // on renseigne ensuite le type de contenu
            contentType : "application/json; charset=utf-8",
    //         // on précise aussi le type de données
            dataType : "json",
    //         // on paramètre le comportement en cas de succcès
            success: (result) => {
    //             // là, il s'agit de faire un console log du resultat et une petite alerte qui récupère les messages paramétrés dans le controller
                verifierStock()
                console.log(result);
                alert(result.message)
            },
    //         // en cas d'erreur
            error : (xhr, status, error) => {
                console.log(xhr);
                console.error(status);
                console.log(error);
                alert("status: " + status + "error: " + error)
            }
        })
    }
            

    //rajouter un eventlistener qui lancera la fonction enc ciblant le bouton et la fonction qui se déclenche
    $("#create_stock").click(rajoutStock);
    $("#getAllStock").click(verifierStock);
    $("#update_stock").click(updateStockByRef);
    $("#delete_stock").click(deleteStockById);
});