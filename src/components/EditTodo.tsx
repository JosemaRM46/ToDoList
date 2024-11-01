import React, { useRef } from 'react';

// Define las propiedades que el componente EditTodo espera recibir
interface EditTodoProps {
  editText: string;
  setEditText: (text: string) => void;
  updateTodo: (id: string, newText: string) => void;
  todoId: string;
}

// Componente EditTodo que renderiza el formulario de edición de una tarea
const EditTodo: React.FC<EditTodoProps> = ({ editText, setEditText, updateTodo, todoId }) => {
  // Referencia para el input, usada para enfocar el input cuando se activa el modo de edición
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col sm:flex-row items-center">
      <input
        ref={inputRef} // Asigna la referencia al input
        className="w-full rounded-md my-2 border-2 bg-background border-gray-700 p-2 sm:w-3/4"
        type="text"
        value={editText} // Valor del input para la tarea en edición
        onChange={(e) => setEditText(e.target.value)} // Actualizar el estado editText cuando cambia el input
      />
      <button
        className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-3 rounded-md border-2 border-gray-700 p-2 bg-background hover:bg-background2"
        onClick={() => updateTodo(todoId, editText)} // Llamar a updateTodo con el texto actualizado
      >
        Guardar
      </button>
    </div>
  );
};

export default EditTodo;