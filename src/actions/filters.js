 export const setTextFilter = ( text = "" ) => ({
    type : "SET_TEXT_FILTER",
    text    
});

export const setSortFilter = ( sortOrder ) => ({
    type : "SORT_FILTER",
    sortOrder
});

export const setPublisherFilter = ( publisher ) => ({
    type : "PUBLISHER_FILTER",
    publisher
});

export const setCategoryFilter = ( category ) => ({
    type : "CATEGORY_FILTER",
    category 
});