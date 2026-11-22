import * as state from "./state.js";
import * as ui from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("taskInput");
  const addBtn = document.querySelector(".btn-add");

  const tasks = await state.fetchTask();

  ui.render(tasks);

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  addBtn.addEventListener("click", async () => {
    if (input.value.trim() === "") {
      return;
    }
    await state.addTask(input.value.trim());
    input.value = "";
    ui.render(state.tasks);
  });

  // obtento toda la lista dinamica a partir del metodo getElementoById
  const elementosTareas = document.getElementById("taskList");

  // itero por cada elemento de la lista y agrego un evento para cada uno
  // que consiste en darle click (delegación de eventos para elementos dinámicos)
  elementosTareas.addEventListener("click", (evento) => {
    // obtengo el elemento li dentro del elemento ul usando el metodo closest
    // que busca hacia arriba si el elemento o su padre es un <li>
    const li = evento.target.closest("li");
    if (!li) return;

    // se obtiene el id de la tarea desde el data-id del li para saber cuál se seleccionó
    const id = Number(li.dataset.id);
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    // se obtienen los elementos/botones dentro del li usando closest
    const botonEliminar = evento.target.closest(".btn-delete");
    const botonActualizar = evento.target.closest(".btn-edit");
    const parrafo = evento.target.closest("p");

    // si se le da click al boton actualizar, se muestra un prompt con el texto actual
    // de la tarea seleccionada dinámicamente para poder modificarlo
    if (botonActualizar) {
      const nuevoTexto = prompt("Actualizar tarea:", tarea.text);
      if (nuevoTexto === null) return;

      const textoLimpio = nuevoTexto.trim();
      if (textoLimpio === "") return;

      tarea.text = textoLimpio;
      render();
      return;
    }

    // si se le da click al boton eliminar, se elimina la tarea del arreglo y se vuelve
    // a renderizar la lista para reflejar los cambios dinámicamente
    if (botonEliminar) {
      tareas = tareas.filter((t) => t.id !== id);
      render();
      return;
    }

    // si existe el elemento p dentro de li lo unico que hacemos es cambiar su estado
    // completed para que cambie su estilo dinamicamente
    if (parrafo) {
      tarea.completed = !tarea.completed;
      render();
    }
  });
});
