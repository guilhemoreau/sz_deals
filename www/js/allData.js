
/**
 * All error text
 *
 * @type {{status: string, message: string, no_internet_connection: {title: string, message: string}, order_already_sold: {title: string, message: string}, error_during_payment: {title: string, message: string}, error_order_shop_is_closed: {title: string, message: string}}}
 */
var errorCodeText = {
    "status": "200",
    "message": "success",
    "no_internet_connection": {
        "title": "",
        "message": "Cette application nécessite internet. Connectez-vous à Internet."
    },
    "order_already_sold":{
        "title": "Dommage!",
        "message":  "<p>Un aute amateur de sushis a été plus rapide que toi pour commander ce lot.</p>" +
        "<p>Regardes si d'autres sushis sont disponibles en cliauqnt sur la chat.</p>"
    },
    "error_during_payment": {
        "title": "Erreur lors du traitement de la carte.",
        "message":  "<p>Nous regrettons, mais il y a eu un problème lors de votre paiement. Sozez assuré " +
        "qu'aucun montant n'a été débità de vorte carte.</p>" +
        "<p>Vous pouvez réessayer dès maintenant</p>"
    },
    "error_order_shop_is_closed":{
        "title": "Le shop est fermé",
        "message":  "<p>Nous sommes vraiement mais ll semble que vous n'ayez pas fait votre achat assez " +
        "vite. Réessayer demain car ce soir il n'est plus possible de commande.</p>"
    },
    "error_max_quantity":{
        "title": "Dommage!",
        "message":  "<p>Un aute amateur de sushis a été plus rapide que toi pour commander ce lot.</p>" +
        "<p>Regardes si d'autres sushis sont disponibles en cliauqnt sur la chat.</p>"
    }
    //TODO add more error code and text
};
