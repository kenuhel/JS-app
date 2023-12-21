import { showModal } from '../render-modal/render-modal';
import './render-add-button.css'

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderAddButton = (element) => {

    const fabButton = document.createElement('button');
    fabButton.classList.add('fab-button');
    fabButton.innerText = '+';

    element.append(fabButton);

    //TODO: listeners
    fabButton.addEventListener('click', () => {
        showModal();
    })

}