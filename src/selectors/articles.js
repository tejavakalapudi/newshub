export default ( articles, { publisher, category, text, sortOrder }  ) => {

    return articles.filter( ( article ) => {

        const publisherMatch = publisher ? article.PUBLISHER === publisher : true;
        const categoryMatch = category ? article.CATEGORY === category : true;
        let textMatch = true;

        if( text ){

            textMatch = article.URL.toLowerCase().includes( text.toLowerCase() ) || article.TITLE.toLowerCase().includes( text.toLowerCase() ); 

        }

        return publisherMatch && categoryMatch && textMatch;
        
    }).sort( ( a, b ) => {

        if( sortOrder && sortOrder === "oldToNew" ){

            return a.TIMESTAMP < b.TIMESTAMP ? -1 : 1;

        }

        return a.TIMESTAMP < b.TIMESTAMP ? 1 : -1;

    });

};