// conexionAPI.js

// Obtener todos los productos
export async function obtenerProductos() {
    try {
        const response = await fetch('http://localhost:3000/videos');
        if (!response.ok) {
            throw new Error('Error al obtener videos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
        throw error;
    }
}

// Enviar un nuevo producto
export async function enviarProducto(producto) {
    try {
        const response = await fetch('http://localhost:3000/videos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al enviar producto:', error);
        throw error;
    }
}

// Actualizar un producto existente
export async function actualizarProducto(id, producto) {
    try {
        const response = await fetch(`http://localhost:3000/videos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
}

// Eliminar un producto
export async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/videos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
}