import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import {deleteUserById} from '../../use-cases/delete-user-by-id';
import './renderTable.css'

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tHeaders = document.createElement('thead');
    tHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tBody = document.createElement('tbody');
    table.append(tHeaders,tBody);
    return table;
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableUserListener = (event) => {
    const element = event.target.closest('.select-user')
    if(!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user')
    if(!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        // Para que cambie el numero de pagino si nos movemos al eliminar
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
        
    } catch (error) {
        console.log(error);
        alert('No se elimino')
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) =>{

    const users = usersStore.getUsers();

    if(!table){
        table = createTable();
        element.append(table);

        //TODO: listeners de la table
        table.addEventListener('click', tableUserListener )
        table.addEventListener('click', tableDeleteListener )

    }

    let tableHTML='';
    users.forEach(user =>{
        tableHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>
                <a href="#/" class="select-user" data-id="${user.id}"> select </a>
                |
                <a href="#/" class="delete-user" data-id="${user.id}"> delete </a>
            </td>
        </tr>
        `
    });


    // querySelector can be use on HTML elements
    table.querySelector('tBody').innerHTML = tableHTML;

}
