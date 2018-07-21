const articlesDefault = {
    list : [],
    liked : []
};

export default ( state = articlesDefault, action ) => {

    switch( action.type ){

        case "SET_ARTICLES" : {
            return { ...state, list : action.articles };
        }

        case "SET_LIKED_ARTICLES" : {
            return { ...state, liked : action.likedArticles };
        }

        default:
        return state;
        
    }      
};