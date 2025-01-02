import React, { useState } from 'react';
import styles from '../../pages/ModalEditarCard/modal.module.css';
import inicio from '../../pages/inicio';

function EditModal({ initialData, onClose, onSave, onDelete }) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const saveChanges = async () => {
        try {
            const method = inicio ? 'PUT' : 'POST';
            const url = inicio ? `http://localhost:3000/videos/${inicio.id}` : 'http://localhost:3000/videos';


            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const savedProduct = await response.json(); // Obtiene la respuesta del producto guardado
                onSave(savedProduct); // Llama a la función onSave para actualizar la lista en la página principal
                onClose(); // Cierra el modal
            } else {
                throw new Error('Error al guardar cambios');
            }
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            alert('Ocurrió un error al guardar los cambios.');
        }
    };

    
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

    const clearChanges = () => {
        setFormData(initialData); // Restablece los campos a su estado inicial
    };

    const handleDelete = () => {
        onDelete(initialData.id);
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{initialData ? 'Editar Card' : 'Crear Nuevo Video'}</h2>
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
                        value={formData.categoria || 'Front-End'}
                        onChange={handleChange}>
                        <option value="Front-End">Front-End</option>
                        <option value="Back-End">Back-End</option>
                        <option value="Innovación y Gestión">Innovación y Gestión</option>
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
                <button onClick={saveChanges}>Guardar</button>
                <button onClick={clearChanges}>Limpiar</button>
                <button onClick={handleDelete}>Eliminar</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}


export default EditModal;