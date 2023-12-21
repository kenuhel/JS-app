
import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/renderTable';
import './render-buttons.css'

export const renderButtons = (element) => {

    // crear 2 botones
    const nextButton = document.createElement('button');
    nextButton.innerText = '  Next >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev  ';

    // tag para el page

    const currentPageOnLoad = document.createElement('span');
    currentPageOnLoad.id = 'current-page';
    currentPageOnLoad.innerText = usersStore.getCurrentPage();

    element.append(prevButton, currentPageOnLoad, nextButton);

    //TODO: listeners

    nextButton.addEventListener('click', async() =>{
        await usersStore.loadNextPage();
        currentPageOnLoad.innerText = usersStore.getCurrentPage();
        renderTable(element);
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageOnLoad.innerText = usersStore.getCurrentPage();
        renderTable(element)
    })

}