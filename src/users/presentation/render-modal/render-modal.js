import modalHTML from './render-modal.html?raw';
import './render-modal.css'
import { User } from '../../models/user-model';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
/**
 * LoadedUser se usa para cargar todos los datos a los cuales no damos mantenimiento
 * en nuestro formulario (gender, Avatar) -> con esto nos aseguramos de que los datos 
 * no se pierdan cuando se realiza un Update
 */
let loadedUser = {};

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');

    if(!id) return;

    const user = await getUserById( id ); 

    setFormValues(user);
}

export const hideModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    // PARA SELECCIONAR UN ESPACIO ESPECIFICO USAMOS TODO EL NOMBRE = '[name="firstName"]'
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;

}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback 
 */
export const renderModal = ( element, callback ) => {

    // si ya esta creado, que lo devuelve
    if(modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if( event.target.className !== 'modal-container' ) return;

        hideModal();
    })

    form.addEventListener('submit', async(event) => {
        // Submit envia el Form y refresca la pagina, necesitamos prevenir eso y controlarlo
        event.preventDefault(); 
        
        const formData = new FormData( form );
        const userlike = { ...loadedUser};

        // isActive no contiene ningun valor, debemos confirmar que exista y contenga
        // un valor booleano. off evita cambion involuntarios
        if(!formData.get('isActive')){
            formData.append('isActive', 'off')
            // console.log('error');
        }

        for (const [key, value] of formData) {
            // convert the value to the correspond type
            if(key === 'balance'){
                userlike[key] = +value
                continue;
            }

            if(key === 'isActive'){
                userlike[key] = (value === "on") ? true : false;
                continue;
            } 
            // this save all the form data on userLike{}
            userlike[key] = value;
        }

        // llama la funcion definida en user-app.js 
        await callback( userlike );

        // console.log(userlike);
        hideModal();
    });

    element.append(modal);
}