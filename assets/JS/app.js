var bills = [];
var countId = 0;
var saldo = 0;
var gastos = 0;
const budgetHTML = document.querySelector("#amountBudget");
const spendsHTML = document.querySelector("#amountSpends");
const balanceHTML = document.querySelector("#amountBalance");


//mostrar alerta
function showAlert(text) {
    let alert = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>¡Error!</strong> ${text}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
    let alertsContainer = document.getElementById('alerts');
    alertsContainer.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    alertsContainer.innerHTML = alert;
}

// Agregar presupuesto
function addBudget() {
    let budget = document.getElementById("budget").value;
    if (budget.trim() === '') {
        showAlert("Ingresa tu presupuesto")
    } else {
        updateBalance(budget);
        saldo = budget;
        updateBudget();
        document.getElementById("budget").value = "";
    }
}

class Spent {
    constructor(id, idSpent, spent) {
        this.id = id;
        this.idSpent = idSpent;
        this.spent = spent;
    }
}

// Agregar gastos
function addSpent() {
    let idSpent = document.getElementById("idSpent").value;
    let spent = document.getElementById("spent").value;
    if (idSpent.trim() === '' || spent.trim() === '') {
        showAlert("Completa todos los datos de tus gastos")
    } else {
        generateId();
        let expense = new Spent(countId,idSpent, spent);
        console.log(expense)
        bills.push(expense);
        updateTable();
        updateSpends();
        updateBudget();
        document.getElementById("idSpent").value = "";
        document.getElementById("spent").value = "";
    }

}

// Generar id
function generateId() {
    countId++;
    return countId;
}

//formato peso chileno
const chileanPesoFormat = (coin) => {
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });
    coin = formatter.format(coin);
    return coin;
}


//Actualiza tabla
function updateTable() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    bills.forEach(({ countId, idSpent, spent }, index) => {
        // crear fila
        const row = document.createElement("tr");
        //agregar nombre gasto
        const expenseCell = document.createElement("td");
        expenseCell.className = "negrita";
        expenseCell.textContent = idSpent;
        row.appendChild(expenseCell);
        //agregar monto gasto
        const amountCell = document.createElement("td");
        spent = chileanPesoFormat(spent);
        amountCell.textContent = spent;
        amountCell.className = "negrita alignRight";
        row.appendChild(amountCell);
        //agregar icono de basura
        const trashCell = document.createElement("td");
        const trashIcon = document.createElement("i");
        trashCell.className = "text-center";
        trashIcon.className = "fas fa-trash-alt";
        trashCell.appendChild(trashIcon);
        row.appendChild(trashCell);
        //borrar dato
        trashIcon.addEventListener("click", () => {
            const index = parseInt(trashIcon.parentElement.parentElement.getAttribute("data-index"));
            bills.splice(index, 1);
            updateSpends()
            row.remove();
        });
        row.setAttribute("data-index", index);
        expenseList.appendChild(row);
    });
}



//actualizar saldo
function updateBudget() {
    let saldoFinal = saldo - gastos;

    if (saldoFinal >= 0) {
        balanceHTML.className = "text-success";
        balanceHTML.textContent = chileanPesoFormat(saldoFinal);
    } else {
        if (saldo === 0) {
            showAlert("Por favor, ingresa tu presupuesto :(");
        }
        else {
            showAlert("El presupuesto ingresado es menor que el total de los gastos :(");
        }
        balanceHTML.className = "text-danger";
        balanceHTML.textContent = chileanPesoFormat(saldoFinal);
    }
}


//total gastos
function updateSpends() {
    let totalSpent = 0;
    for(let i = 0; i < bills.length; i++){
        totalSpent += parseFloat(bills[i].spent);
    }
    gastos = totalSpent;
    console.log(totalSpent);
    updateBudget();
    totalSpent = chileanPesoFormat(totalSpent);
    spendsHTML.textContent = totalSpent;
}

//actualizar presupuesto
function updateBalance(monto) {
    if (monto === "" || monto === null || isNaN(monto)) {
        window.location.reload();
    }
    else {
        monto = chileanPesoFormat(monto);
        budgetHTML.textContent = monto;
    }
}

