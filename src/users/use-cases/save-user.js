import { localhostUserToModel } from '../mappers/localhost.mapper.user';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/user-model'
/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async( userLike ) => {

    const user =  new User(userLike);
    const userToSave = userModelToLocalhost(userLike);

    if(!user.firstName || !user.lastName)
        throw 'First and last name are required'

    // save and update user
    let userUpdated;

    if(user.id){
        userUpdated = await updateUser(userToSave);
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localhostUserToModel(userUpdated);
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async(user) =>{
    // llamamos el url del .ENV
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    // Modificamos el fetch() para que sea un POST
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' }
    });

    // este await solo combierte el result en un Json
    const newUser = await res.json();
    console.log({newUser});

    return newUser;
}


/**
 * 
 * @param {Like<User>} user 
 * EL CAMBIO MAS SIGNIFICATIVO EN AGREGAR EL ${USER.ID} EN EL URL
 */
const updateUser = async(user) =>{
    // llamamos el url del .ENV
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    // Modificamos el fetch() para que sea un POST
    const res = await fetch(url, {
        method: 'PATCH', // post: mod all the file / patch: mod only what i send them
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' }
    });

    // este await solo combierte el result en un Json
    const updatedUser = await res.json();
    console.log({updatedUser});

    return updatedUser;
}