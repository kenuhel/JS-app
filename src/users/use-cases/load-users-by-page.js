import { localhostUserToModel } from "../mappers/localhost.mapper.user";
import { User } from "../models/user-model";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async(page = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    // recordar: fetch se usar para hacer llamadas HTTP
    const res = await fetch(url); 
    // este await es para darle tiempo a pasarlo a Json
    const data = await res.json();

    // RECORDAR: map() => iterar sobre cada elemento del arreglo y aplicar una función a cada uno de esos elemento
    const users =  data.map(localhostUserToModel)
   
    console.log(users);
    return users;
}

