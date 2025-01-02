import React, { useState } from 'react';
import styles from '../../pages/ModalEditarCard/modal.module.css';

function EditModal({ initialData, onClose, onSave, onDelete }) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const saveChanges = () => {
        onSave(formData); // Llama a la función onSave pasada como prop
        onClose();
    };

    const clearChanges = () => {
        setFormData(initialData);
    };

    const handleDelete = () => {
        onDelete(initialData.id);
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Nuevo video</h2>
                <div>
                    <label>Título:</label>
                    <input
                        name="titulo"
                        value={formData.titulo || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <select
                        name="categoria"
                        value={formData.categoria || ''}
                        onChange={handleChange}>
                        <option value="Front-End">Front-End</option>
                        <option value="Back-End">Back-End</option>
                        <option value="Innovación y Gestión">
                            Innovación y Gestión
                        </option>
                    </select>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        name="capa"
                        value={formData.capa || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Video URL:</label>
                    <input
                        name="video"
                        value={formData.video || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion || ''}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={saveChanges}>Guardar</button> {/* Llama a saveChanges */}
                <button onClick={clearChanges}>Limpiar</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default EditModal;