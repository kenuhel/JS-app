
/**
 * 
 * @param {String|Number} id 
 */
export const deleteUserById = async(id) =>{
    // llamamos el url del .ENV
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    // Modificamos el fetch() para que sea un POST
    const res = await fetch(url, {
        method: 'DELETE'
    });

    // este await solo combierte el result en un Json
    const deleteResult = await res.json();
    console.log({deleteResult});

    return true;
}