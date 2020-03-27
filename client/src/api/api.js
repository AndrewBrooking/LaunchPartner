import axios from "axios";
import FormData from "form-data";

export default {
    // Performs an axios GET request for a user via UUID
    getUser: uuid => {
        return axios.get(`/api/users/${uuid}`);
    },

    // Performs an axios GET request for a user via username
    searchUser: username => {
        return axios.get(`/api/users/search/username=${username}`);
    },

    // Performs an axios POST request to register a new user
    register: (email, username, password, description, photo) => {
        let data = new FormData();
        data.append("email", email);
        data.append("username", username);
        data.append("password", password);
        data.append("description", description);
        data.append("photo", photo);

        let headers = {
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        };

        return axios.post("/api/register", data, { headers });
    },

    // Performs an axios POST request to login a user
    login: (username, password) => {
        return axios.post("/api/login", { username, password });
    },

    // Performs an axios POST request to logout a user
    logout: () => {
        return axios.post("/api/logout");
    },

    // Performs an axios POST request to update a user's data
    updateUser: (uuid, username, description, photo) => {
        let data = new FormData();
        data.append("uuid", uuid);

        if (username) {
            data.append("username", username);
        }
        
        if (description) {
            data.append("description", description);
        }
        
        if (photo) {
            data.append("photo", photo);
        }

        let headers = {
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        }

        return axios.post("/api/user/update", data, { headers });
    },

    // Performs an axios POST request to update a user's password
    updatePasword: (uuid, curr_pass, new_pass) => {
        return axios.post("/api/user/security", { uuid, curr_pass, new_pass });
    }
};