import React, { useState } from 'react';

function EditModal({ initialData, onClose }) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const saveChanges = () => {
        // Lógica para guardar los cambios
        // Esto podría implicar actualizar el estado global o enviar datos a un backend
        onClose(); // Cierra el modal después de guardar
    };

    const clearChanges = () => {
        setFormData(initialData); // Restablecer el formulario a los valores iniciales
    };

    return (
        <div className="modal">
            <h2>Editar Card</h2>
            <div>
                <label>Título:</label>
                <input name="titulo" value={formData.titulo} onChange={handleChange} />
            </div>
            <div>
                <label>Categoría:</label>
                <select name="categoria" value={formData.categoria} onChange={handleChange}>
                    <option value="opcion1">Front-End</option>
                    <option value="opcion2">BackEnd</option>
                    <option value="opcion2">Innovación y gestion</option>
                </select>
            </div>
            <div>
                <label>Imagen:</label>
                <input name="capa" value={formData.capa} onChange={handleChange} />
            </div>
            <div>
                <label>Video:</label>
                <input name="video" value={formData.video} onChange={handleChange} />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </div>
            <button onClick={saveChanges}>Guardar Cambios</button>
            <button onClick={clearChanges}>Limpiar Cambios</button>
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
}

export default EditModal