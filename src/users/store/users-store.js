import { loadUsersByPage } from "../use-cases/load-users-by-page"


const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users =  await loadUsersByPage(state.currentPage+1);
    if ( users.length === 0 )  return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    if(state.currentPage === 1) return;
    const users =  await loadUsersByPage(state.currentPage-1);
    if(users.length === 0) return;

    state.currentPage -= 1;
    state.users = users;
}

// TODO: implementar
/**
 * @param {User} updatedUser
 */
const onUserChanged = ( updatedUser ) => {

    let wasFound = false;
    state.users = state.users.map( user => {
        if(user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;
        }
        
        // user.id === updatedUser.id ? updatedUser : user // operador terniario

        if( state.users.length < 10 && !wasFound ){
            state.users.push(updatedUser);
        }
        return user;
    });
    
}

// Porque: se usa para recargar la pagina cuando se elimina un usuario. Esto evita que 
// la pagina muestre menos de 10 usuario, a menos que solo queden 9 users en DB
const reloadPage = async() => {
    const users =  await loadUsersByPage(state.currentPage);
    if ( users.length === 0){
        await loadPreviousPage();
        return;
    };
    state.users = users;
}

export default{
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    /**
     * 
     * @returns  {Users[]}
     * funcion de flecha dentro de un objeto utiliza ':()' en remplazo del '=()'
     * utiliza el spread para pasar los valores del state (es un Obj[primitivo,array])
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns {Number}
     * lo mismo que arriba. valor es un primitivo, no necesita spread
     */
    getCurrentPage: () => state.currentPage,

}