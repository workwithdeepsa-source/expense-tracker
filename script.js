let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (amount === "" || category === "") {
    alert("Enter all fields");
    return;
  }

  let expense = {
    amount: parseFloat(amount),
    category: category
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";

  displayExpenses();
}

function displayExpenses() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;
  let categoryData = {};

  expenses.forEach((exp, index) => {
    total += exp.amount;

    if (!categoryData[exp.category]) {
      categoryData[exp.category] = 0;
    }
    categoryData[exp.category] += exp.amount;

    let li = document.createElement("li");

    li.innerHTML = `
      ₹${exp.amount} - ${exp.category}
      <span class="delete-btn" onclick="deleteExpense(${index})">❌</span>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;

  renderChart(categoryData);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

function resetData() {
  if (confirm("Are you sure you want to reset all data?")) {
    localStorage.clear();
    expenses = [];
    displayExpenses();
  }
}

function renderChart(data) {
  let ctx = document.getElementById("chart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

displayExpenses();

displayExpenses();
