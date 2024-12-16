import React, { useState } from 'react';
import styles from './modal.module.css';

function EditModal({ initialData, onClose, onSave }) {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const saveChanges = async () => {
        try {
            // Cambia esta URL según lo que necesites para crear o editar
            const method = initialData ? 'PUT' : 'POST';
            const url = initialData ? `http://localhost:3000/videos/${initialData.id}` : 'http://localhost:3000/videos';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                onSave(formData); // Llama a la función onSave para actualizar la lista de videos
                onClose();
            } else {
                throw new Error('Error al guardar cambios');
            }
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            alert('Ocurrió un error al guardar los cambios.');
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{initialData ? 'Editar Card' : 'Crear Nuevo Video'}</h2>
                {/* Restante del formulario */}
                <button onClick={saveChanges}>Guardar</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}


export default EditModal;