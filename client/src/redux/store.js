import { createStore } from "redux";
import { LOGIN, LOGOUT, SEARCH } from "./actions";

// Define initial state
const initialState = {
    authenticated: false,
    search: ""
};

// Create reducer
function appEvent(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            state.authenticated = true;
            break;
        case LOGOUT:
            state.authenticated = false;
            break;
        case SEARCH:
            state.search = action.payload.term;
            break;
    }

    return state;
}

// Create adn export store
export default createStore(appEvent);