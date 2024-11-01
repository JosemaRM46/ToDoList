import React, { useState } from 'react';
import { IconButton, IconButtonProps } from '@mui/material';

// Define las propiedades que el componente HoverIconButton espera recibir
interface HoverIconButtonProps extends React.PropsWithChildren<IconButtonProps> {
  hoverColor: string; // Color del ícono cuando el mouse está encima
  defaultColor: string; // Color del ícono por defecto
}

// Componente HoverIconButton que cambia de color cuando el mouse está encima
const HoverIconButton: React.FC<HoverIconButtonProps> = ({ hoverColor, defaultColor, children, ...props }) => {
  // Estado para manejar si el mouse está encima del botón
  const [hover, setHover] = useState(false);

  return (
    <IconButton
      {...props} // Pasa todas las propiedades adicionales al componente IconButton
      style={{ color: hover ? hoverColor : defaultColor }} // Cambia el color del ícono basado en el estado hover
      onMouseEnter={() => setHover(true)} // Cambia el estado hover a true cuando el mouse entra
      onMouseLeave={() => setHover(false)} // Cambia el estado hover a false cuando el mouse sale
    >
      {children} {/* Renderiza los hijos del componente (el ícono)*/}
    </IconButton>
  );
};

export default HoverIconButton; // Exporta el componente HoverIconButton como el valor por defecto