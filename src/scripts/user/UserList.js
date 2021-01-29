import Fetch, { getAuthorizationHeader } from '../api/Fetch';

export default class UserList {
    /**
     * Fetch the data of all users
     */
    static async getAllUsers() {
        return Fetch.get(`users/`, getAuthorizationHeader());
    }
}