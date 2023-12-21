import { localhostUserToModel } from "../mappers/localhost.mapper.user";
import { User } from "../models/user-model";

/**
 * 
 * @param {String|Number} page 
 * @returns {Promise<User[]>}
 * 
 * TODOS LO DATOS SE PIDEN AL SERVIDOR - USANDO FETCH()
 * 
 */
export const getUserById = async( id ) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    // recordar: fetch se usar para hacer llamadas HTTP
    const res = await fetch(url); 
    // este await es para darle tiempo a pasarlo a Json
    const data = await res.json();

    const user = localhostUserToModel(data);
    // console.log({user});

    return user;
}
