import axios from "axios";

export const setArticles = ( articles = [] ) => ({
    type : "SET_ARTICLES",
    articles    
});

export const setLikedArticles = ( likedArticles = [] ) => ({
    type : "SET_LIKED_ARTICLES",
    likedArticles    
});

export const startSetArticles = () => {
    
    return( dispatch ) => {

        var event = new Date();

        console.log( "Requesting articles from api at ", event.toTimeString());

        return axios({

            method:"get",
            url:"https://api.myjson.com/bins/10ijyt"

        })
        .then(( res ) => {

            dispatch( setArticles( res.data ) );

        })
        .catch(( e ) => {
    
            console.log( "Fetching articles has failed with an error ", e );

        })

    }

};