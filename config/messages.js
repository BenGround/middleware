let message = {};

message.articles_added_success = 'Les article(s) ont été ajoutée(s).';
message.wrong_articles_in_order = 'Certain(s) article(s) ou menu(s) n\'appartiennent pas au restaurant.';
message.wrong_data = 'Les informations renseignées ne sont pas correctes.';
message.invalid_token = 'Le token n\'est pas valide';
message.token_not_provided = 'Le token n\'a pas été renseigné.'
message.permission_denied = 'Vous n\'avez pas la permission.';
message.mongodb_connection_success = 'Connexion à MongoDB  Commune réussie !';
message.mongodb_connection_error = 'Connexion à MongoDB Commune échouée !';
message.user_suspended_deleted = 'Utilisateur suspendu ou supprimé !'

message.logConnectionUser = (username) => {
    return 'L\'utilisateur ' + username + ' s\'est connecté(e).'
}

message.notFoundObject = (objectName) => {
    return 'L\'objet ' + objectName + ' n\'extiste pas.';
}

message.createObject = (objectName) => {
    return 'L\'objet ' + objectName + ' a bien été créé.';
}

message.editObject = (objectName) => {
    return 'L\'objet ' + objectName + ' a bien été modifié.';
}

message.deleteObject = (objectName) => {
    return 'L\'objet ' + objectName + ' a bien été supprimé.';
}

module.exports = message;
