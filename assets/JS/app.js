let bills = [];
let countId = 0;
const budgetHTML = document.querySelector("#amountBudget");
const spendsHTML = document.querySelector("#amountSpends");
const balanceHTML = document.querySelector("#amountBalance");


// Agregar presupuesto
function addBudget() {
    let budget = document.getElementById("budget").value;
    updateBalance(budget);
    updateBudget(budget);
    document.getElementById("budget").value = "";
}

// Agregar gastos
function addSpent() {
    var idSpent = document.getElementById("idSpent").value;
    var spent = document.getElementById("spent").value;
    generateId();
    bills.push({ countId, idSpent, spent });
    updateTable();
    updateSpends();
    updateBudget();
    document.getElementById("idSpent").value = "";
    document.getElementById("spent").value = "";
}

// Generar id
function generateId() {
    countId++;
    return countId;
}

//formato peso chileno
function chileanPesoFormat(coin){
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
        //agregar col id
        const idCell = document.createElement("td");
        idCell.textContent = countId;
        row.appendChild(idCell);
        //agregar nombre gasto
        const expenseCell = document.createElement("td");
        expenseCell.textContent = idSpent;
        row.appendChild(expenseCell);
        //agregar monto gasto
        const amountCell = document.createElement("td");
        spent = chileanPesoFormat(spent);
        amountCell.textContent = spent;
        row.appendChild(amountCell);
        //agregar icono de editar
        const editCell = document.createElement("td");
        const editIcon = document.createElement("i");
        editCell.className = "text-center";
        editIcon.className = "fas fa-edit";
        editCell.appendChild(editIcon);
        row.appendChild(editCell);
        //editar con un modal
        //agregar codigoooooooooooooo
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
    balanceHTML.textContent = "dfsdf";
}

//total gastos
function updateSpends() {
    let totalSpent = bills.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.spent);
      }, 0);
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

