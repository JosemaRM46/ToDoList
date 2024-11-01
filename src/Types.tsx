// Define el tipo TodoType para representar una tarea en la aplicación
export type TodoType = {
    text: string; // El texto de la tarea, obligatorio
    completed: boolean; // El estado de completado de la tarea, obligatorio
    id: string; // El identificador único de la tarea, obligatorio
}