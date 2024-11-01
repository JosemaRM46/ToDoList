import Form from "./components/Form"
import {useState, useEffect, useRef ,FormEventHandler} from 'react'
import Todo from "./components/Todo"
import { collection, query, onSnapshot, deleteDoc, doc, addDoc, updateDoc,  orderBy, Timestamp } from "firebase/firestore"
import { db } from "./components/Firebase"
import { TodoType } from "./Types"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditTodo from './components/EditTodo';

const MySwal = withReactContent(Swal)
const App = () => {
  const [todo, setTodo] = useState<TodoType[]>([]); // Estado para almacenar la lista de tareas
  const [input, setInput] = useState('') // Estado para almacenar el valor del input
  const [editId, setEditId] = useState<string | null>(null);  // Estado para almacenar el ID de la tarea en edición
  const [editText, setEditText] = useState<string>(''); // Estado para almacenar el texto de la tarea en edición
  const inputRef = useRef<HTMLInputElement>(null); // Referencia para el input

  // Función para crear una nueva tarea
  const createTodo : FormEventHandler<HTMLInputElement> = async (e) =>{
    e.preventDefault()
    if(input === ''){
      MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El texto no puede estar vacío',
      });
      return 
    }
    try {
      const newTodo = { text: input, completed: false, timestamp: Timestamp.now() };
      const todosCollection = collection(db, 'todos');
      await addDoc(todosCollection, newTodo);
      setInput(''); // Limpiar el input después de crear la tarea
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al crear la tarea: ${String(error)}`,
      });
    }
  }

  // Función para alternar el estado de completado de una tarea
  const toggleComplete = async (todo: TodoType) =>{
    try {
      // Obtener la referencia del documento de la tarea en Firestore
      const todoDoc = doc(db, "todos", todo.id);
  
      // Actualizar el estado de completado de la tarea en Firestore
      await updateDoc(todoDoc, {
        completed: !todo.completed // Cambia el estado de completado de la tarea
      });
    } catch (error) {
      console.error('Error al actualizar el estado de completado:', error);
    }
  }

  // Verificar si la tarea está completada
  const startEditing = (id: string, text: string, completed: boolean) => {
    if (completed){
      MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No puedes editar una tarea completada',
      });
      return
    }
    setEditId(id); // Establecer el ID de la tarea en edición
    setEditText(text); // Establecer el texto de la tarea en edición
  };

  // useEffect para enfocar el input cuando se activa el modo de edición
  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  // Borra una tarea
  const deleteTodo = async (id: string) =>{
    await deleteDoc(doc(db,"todos", id));
  }

  // Función para actualizar una tarea existente
  const updateTodo = async (id: string, newText: string) => {
    if (newText.trim() === '') {
      MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El texto no puede estar vacío',
      });
      return;
    }
    try {
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { text: newText });
      setEditId(null); // Resetear el modo de edición
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al actualizar la tarea: ${String(error)}`,
      });
    }
  };

  // Función para contar las tareas incompletas
  const countIncompleteTasks = () => {
    return todo.filter(t => !t.completed).length;
  };

  // useEffect para obtener las tareas de Firestore y suscribirse a los cambios
  useEffect(() => {
    const todosCollection = collection(db, 'todos');
    const todosQuery = query(todosCollection, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(todosQuery, (snapshot) => {
      const todosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TodoType));
      setTodo(todosList);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);
  
  return (
    
    <div className='h-screen w-screen p-4 bg-background overflow-y-scroll'> 
      <div className="bg-bgTab text-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center  p-2 mb-1 ">ToDo List</h1>
        <Form createTodo={createTodo} input={input} setInput={setInput} />
        <ul>
        {todo.map((todos, index) => (
            <li key={index}>
              {editId === todos.id ? (
                <EditTodo
                editText={editText}
                setEditText={setEditText}
                updateTodo={updateTodo}
                todoId={todos.id}
              />
              ) : (
                <Todo 
                  todos={todos} 
                  deleteTodo={deleteTodo} 
                  toggleComplete={toggleComplete} 
                  startEditing={startEditing} 
                />
              )}
            </li>
          ))}
        </ul>
        <p className="text-center mt-3"> Tienes {countIncompleteTasks()} tarea{countIncompleteTasks() !==1 ? 's' : ''} por hacer</p> {/* Muestra el número de tareas incompletas y vuelve la palabra "tarea" en prural o singular segun la necesidad */}
      </div>
    </div> 
  )
}

export default App