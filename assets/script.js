const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task')

let minhaLista = []

function AdicionarNovatarefa() {
    const tarefa = input.value.trim(); 

    if (tarefa !== '') { 
        minhaLista.push({
            tarefa: tarefa,
            concluida: false
        });
        input.value = '';

        MostrarTarefas();
    }
    else{
        window.alert('Digite alguma tarefa')
    }
}

function MostrarTarefas() {
    let novaLI = '';
    minhaLista.forEach((tarefa, index) => {
        novaLI = novaLI + `<li class="task ${tarefa.concluida && "done"}">
                <img src="./assets/checked.png" alt="check na tarefa" onclick="concluirTarefa(${index})">
                <p>${tarefa.tarefa}</p>
                <img src="./assets/trash.png" alt="Excluir tarefa" onclick="DeletarItem(${index})">
                </li>`
    });
    listaCompleta.innerHTML = novaLI;

    localStorage.setItem('Lista', JSON.stringify(minhaLista));
}

function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('Lista');
    if (tarefasLocalStorage) {
        minhaLista = JSON.parse(tarefasLocalStorage);
        MostrarTarefas();
    }
}

function concluirTarefa(index) {
    minhaLista[index].concluida = !minhaLista[index].concluida;
    MostrarTarefas();
}

function DeletarItem(index) {
    minhaLista.splice(index, 1);
    MostrarTarefas();
}

button.addEventListener('click', AdicionarNovatarefa);

// Recarrega as tarefas ao carregar a página
window.onload = recarregarTarefas;
