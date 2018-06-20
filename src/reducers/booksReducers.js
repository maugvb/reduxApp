"use strict"
//BOOKS REDUCERS
export const booksReducers = function(state={
books:[{
    _id: 1,
    title: 'this is the book title',
    description: "this is the book description",
    price: 33.33
},
{
    _id: 2,
    title: 'this is the second book title',
    description: "this is the second book description",
    price: 50.2
}
]}, action){
    switch(action.type){
        case "GET_BOOK":
          return {...state, books:[...state.books]}        
        case "POST_BOOK":
          return {books:[...state.books, ...action.payload]}
        case "UPDATE_BOOK":
            //Create a copy of the current array of books
            const currentBookToUpdate = [...state.books]
            //Determine at wich index in books array is the book to be updated
            const indexToUpdate = currentBookToUpdate.findIndex(
                function(book){
                    return book._id === action.payload._id;
                }
            )
            //Create a new book object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat method too
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }

            //This Log has the pupose to show you how newBookToUpdate looks like
            console.log("what is it newBookToUpdate", newBookToUpdate);
            
                return{books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]} 
        case "DELETE_BOOK":
        //Create a copy of the current array of books
        const currentBookToDelete = [...state.books]
        //Determine at wich index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(book){
                return book._id === action.payload._id;
            }
        )
        return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]}
        
    }
    return state;
}