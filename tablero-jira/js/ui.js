const list = document.querySelector("ul");

export const render = (tareas) => {
  list.innerHTML = "";
  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    // se guarda el id de la tarea en el elemento li para identificarla dinámicamente
    li.dataset.id = tarea.id;
    const parrafo = document.createElement("p");
    const contenidoParrafo = document.createTextNode(tarea.text);
    // si la tarea está completada se mantiene el estilo al renderizar
    if (tarea.completed) {
      parrafo.classList.add("completed");
    }

    // CAMBIAR: inyectarle dinamicamente a traves de la funcion
    // innerHtml los dos botones

    // se crea un boton eliminar de manera dinamica
    const botonEliminar = document.createElement("button");
    // se crea un boton actualizar de manera dinamica
    const botonActualizar = document.createElement("button");
    // se crea el contenido de texto para el boton eliminar
    const contenidoBottonEliminar = document.createTextNode("Eliminar Tarea");
    // se crea el contenido de texto para el boton actualizar
    const contenidoBotonActualizar =
      document.createTextNode("Actualizar Tarea");
    // se le ingresa dinamicamente al boton eliminar el classname 'btn-delete'
    botonEliminar.classList.add("btn-delete");
    // se le ingresa dinamicamente al boton actualizar el classname 'btn-edit'
    botonActualizar.classList.add("btn-edit");
    // se le inserta ese contenido de texto al boton eliminar con appendChild
    botonEliminar.appendChild(contenidoBottonEliminar);
    // se le inserta ese contenido de texto al boton actualizar con appendChild
    botonActualizar.appendChild(contenidoBotonActualizar);
    parrafo.appendChild(contenidoParrafo);
    li.appendChild(parrafo);
    // se le inserta el boton eliminar de manera dinamica al elemento de la lista
    li.appendChild(botonEliminar);
    // se le inserta el boton actualizar de manera dinamica al elemento de la lista
    li.appendChild(botonActualizar);
    list.appendChild(li);
  });
};
