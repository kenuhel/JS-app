import { User } from "../models/user-model"

/**
 * 
 * @param {like<User>} localhostUser // <= los llamamos en el 'loadUsersByPage' para convertir data
 * @returns {User}
 */
export const localhostUserToModel = (localhostUser) => {

    // desestructuramos el contenido del localhostUser

    const {
        id,isActive,avatar,balance,first_name,last_name,gender
    } = localhostUser;

    //le pasamos al User() los paramentros del constructor
    return new User({
        id,
        isActive,
        avatar,
        balance,
        firstName: first_name,
        lastName: last_name,
        gender
    })

}