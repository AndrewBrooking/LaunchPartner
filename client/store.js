import { createStore } from "redux";
import "./actions";

// Define initial state
const initialState = {
    uuid: "",
    search: ""
};

// Create reducer
function appEvent(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, { uuid: action.uuid });
        case LOGOUT:
            return Object.assign({}, state, { uuid: "" });
        case SEARCH:
            return Object.assign({}, state, { search: action.term });
        default:
            return state;
    }
}

// Create store
export const store = createStore(appEvent);