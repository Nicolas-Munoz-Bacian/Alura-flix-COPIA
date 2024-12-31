import React, { useState, useEffect } from 'react';
import styles from '../../pages/ModalEditarCard/modal.module.css';

function EditModal({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveChanges = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Editar Video</h2>
        <form onSubmit={saveChanges}>
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
              onChange={handleChange}
            >
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
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;