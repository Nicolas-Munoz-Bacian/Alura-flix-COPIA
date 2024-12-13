import React, { useState } from 'react';
import styles from '../../pages/ModalEditarCard/modal.module.css';

function EditModal({ initialData, onClose }) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const saveChanges = () => {
        // Lógica para guardar los cambios
        onClose(); // Cierra el modal
    };

    const clearChanges = () => {
        setFormData(initialData); // Restablecer el formulario
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Editar Card</h2>
                <div>
                    <label>Título:</label>
                    <input name="titulo" value={formData.titulo} onChange={handleChange} />
                </div>
                <div>
                    <label>Categoría:</label>
                    <select name="categoria" value={formData.categoria} onChange={handleChange}>
                        <option value="opcion1">Opción 1</option>
                        <option value="opcion2">Opción 2</option>
                    </select>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input name="capa" value={formData.capa} onChange={handleChange} />
                </div>
                <div>
                    <label>Video URL:</label>
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
        </div>
    );
}

export default EditModal;