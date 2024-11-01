import AddCircleIcon  from "@mui/icons-material/AddCircle"
import { FormEventHandler} from "react"
import HoverIconButton from './HoverIconButton';
import colors from '../colors';

// Define las propiedades que el componente Form espera recibir
interface FormPropTypes {
    createTodo: FormEventHandler;
    input: string,
    setInput: (input: string) => void,
}

// Componente Form que renderiza un formulario para agregar nuevas tareas
const Form = ({ createTodo, input, setInput }: FormPropTypes) => {
  return (
    <form onSubmit={createTodo} className="flex justify-between  bg-bgBlack p-4 rounded-lg items-center">
      <input
        placeholder=" Ingrese una nueva tarea"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-full  text-red rounded-md p-[3px] bg-opacity-60 bg-customGrey"
      />
      <HoverIconButton
        defaultColor={colors.customGreen} // Color por defecto del botón
        hoverColor={colors.customGreenDark} // Color del botón cuando se pasa el mouse por encima
        type="submit"
        className="rounded-lg"
      >
        <AddCircleIcon />
      </HoverIconButton>
    </form>
  );
};

export default Form