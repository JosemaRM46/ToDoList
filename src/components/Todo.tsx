import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { TodoType } from "../Types"
import HoverIconButton from './HoverIconButton';
import colors from '../colors';

// Define las propiedades que el componente Todo espera recibir
interface TodoProps {
    todos: TodoType // Objeto que representa una tarea
    deleteTodo: (id: string) => void // Función para eliminar una tarea
    toggleComplete: (todo: TodoType) => void // Función para marcar una tarea como completada o no completada
    startEditing: (id: string, text: string, completed: boolean) => void // Función para iniciar la edición de una tarea
}

// Componente Todo que renderiza una tarea individual
const Todo = ({ todos, deleteTodo, toggleComplete, startEditing } : TodoProps) => {
    return (
        <li className="p-2 bg-bgBlack my-2 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
                {/* Renderiza el texto de la tarea, con estilo diferente si está completada */}
                <p className={todos.completed ? "text-white cursor-pointer line-through opacity-30 font-bold " : "text-white font-bold cursor-pointer"}>{todos.text}</p>
                <div className="flex gap-3">
                {/* Botón para marcar la tarea como completada o no completada */}
                <HoverIconButton
                    defaultColor={colors.customGreen} // Color por defecto del ícono
                    hoverColor={colors.customGreenDark} // Color del ícono cuando se pasa el mouse por encima
                    onClick={() => toggleComplete(todos)} // Llama a toggleComplete cuando se hace clic
                >
                    <CheckIcon />
                </HoverIconButton>

                {/* Botón para iniciar la edición de la tarea */}
                <HoverIconButton
                    defaultColor={colors.customGreen} // Color por defecto del ícono
                    hoverColor={colors.customGreenDark} // Color del ícono cuando se pasa el mouse por encima
                    onClick={() => startEditing(todos.id, todos.text || '', todos.completed ?? false)} // Llama a startEditing cuando se hace clic
                >
                    <EditIcon />
                </HoverIconButton>

                {/* Botón para eliminar la tarea */}
                <HoverIconButton
                    defaultColor={colors.customGreen} // Color por defecto del ícono
                    hoverColor={colors.customGreenDark} // Color del ícono cuando se pasa el mouse por encima
                    onClick={() => deleteTodo(todos.id)} // Llama a deleteTodo cuando se hace clic
                >
                    <DeleteIcon />
                </HoverIconButton>    
                </div>
            </div>
        </li>
    )
}

export default Todo