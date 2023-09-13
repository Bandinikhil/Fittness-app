import searchResultSlice from "./searchResultSlice";

const { configureStore } = require("@reduxjs/toolkit");
const { default: searchSlice } = require("./searchSlice");



const store = configureStore({
    reducer: {
        search : searchSlice,
        suggestions : searchResultSlice
    },
})

export default store;