import { User } from "../models/user-model"

/**
 * @param {User} user
 */
export const userModelToLocalhost = (user) => {

    const {
        id,
        isActive,
        avatar,balance,
        firstName,
        lastName,
        gender
    } = user;

    return {
        id,
        isActive,
        avatar,
        balance,
        first_name:  firstName,
        last_name: lastName,
        gender
    };

}