import { renderButtons } from './presentation/render-buttons/render-buttons';
import { renderModal } from './presentation/render-modal/render-modal';
import { renderTable } from './presentation/render-table/renderTable';
import { renderAddButton } from './presentation/renderAddButton/render-add-button';
import userStore from './store/users-store'
import { saveUser } from './use-cases/save-user';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async(element) => {

    element.innerHTML = 'Loading...';
    await userStore.loadNextPage();
    element.innerHTML = ''; // para vaciarlo

    renderTable( element );
    renderButtons( element );
    renderAddButton( element );
    // el callback de renderModal realiza la funcion aqui creada
    renderModal(element, async( userLike ) => {
        // saveUser return datos iguales al servidor => '_'
        const user = await saveUser(userLike);
        console.log(user);
        userStore.onUserChanged( user );
        renderTable();
    });


}