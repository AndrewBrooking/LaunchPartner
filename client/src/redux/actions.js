// Define action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SEARCH = "SEARCH";

// Create action creators
export function login() {
    return { type: LOGIN };
}

export function logout() {
    return { type: LOGOUT };
}

export function search(term) {
    return { type: SEARCH, payload: { term } };
}