const filtersDefault = {
    text : "",
    sortOrder : "", 
    publisher : "",
    category : ""
};

export default ( state = filtersDefault, action ) => {
    switch( action.type ){

        case "SET_TEXT_FILTER" : {

            return { ...state, text : action.text }

        }

        case "SORT_FILTER" : {

            return { ...state, sortOrder : action.sortOrder }

        }

        case "PUBLISHER_FILTER" : {

            return { ...state, publisher : action.publisher }

        }

        case "CATEGORY_FILTER" : {

            return { ...state, category : action.category }
            
        }

        default:
        return state;
    }     
};