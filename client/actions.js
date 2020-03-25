// Define action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SEARCH = "SEARCH";

// Create action creators
export function login(uuid) {
    return { type: LOGIN, uuid };
}

export function logout() {
    return { type: LOGOUT };
}

export function search(term) {
    return { type: SEARCH, term };
}