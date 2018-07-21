const articlesDefault = [];

export default ( state = articlesDefault, action ) => {

    switch( action.type ){

        case "SET_ARTICLES" : {
            return action.articles;
        }

        default:
        return state;
        
    }      
};