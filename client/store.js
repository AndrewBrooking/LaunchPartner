import { createStore } from "redux";
import { LOGIN, LOGOUT, SEARCH } from "./actions";

// Define initial state
const initialState = {
    uuid: "",
    search: ""
};

// Create reducer
function appEvent(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            state.uuid = action.payload.uuid;
        case LOGOUT:
            state.uuid = "";
        case SEARCH:
            state.search = action.payload.term;
    }

    return state;
}

// Create adn export store
export default createStore(appEvent);