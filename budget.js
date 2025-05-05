let button = document.querySelector("#submitButton");

// Event listener when button is clicked
button.addEventListener("click", function () {
  // Get input elements
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");

  // Income inputs
  const salary = document.getElementById("salary");
  const rentals = document.getElementById("rentals");
  const stocks = document.getElementById("stocks");
  const freelance = document.getElementById("freelance");
  const affiliate = document.getElementById("affiliate");

  // Expense inputs
  const mortgage = document.getElementById("mortgage");
  const utilities = document.getElementById("utilities");
  const groceries = document.getElementById("groceries");
  const transport = document.getElementById("transport");
  const insurance = document.getElementById("insurance");

  const list = document.getElementById("final_list");

  // User object
  const user = {
    name: name.value,
    surname: surname.value,
  };

  // Income object
  const income = {
    salary: {
      amount: salary.value,
      recurring: document.querySelector('input[name="salaryRecurring"]:checked')
        ?.value,
    },
    rentals: {
      amount: rentals.value,
      recurring: document.querySelector(
        'input[name="rentalsRecurring"]:checked'
      )?.value,
    },
    stocks: {
      amount: stocks.value,
      recurring: document.querySelector('input[name="stocksRecurring"]:checked')
        ?.value,
    },
    freelance: {
      amount: freelance.value,
      recurring: document.querySelector(
        'input[name="freelanceRecurring"]:checked'
      )?.value,
    },
    affiliate: {
      amount: affiliate.value,
      recurring: document.querySelector(
        'input[name="affiliateRecurring"]:checked'
      )?.value,
    },
  };

  // Save income
  let userIncome = JSON.parse(sessionStorage.getItem("userIncome")) || [];
  userIncome.push(income);
  sessionStorage.setItem("userIncome", JSON.stringify(userIncome));

  // Expense object
  const expenses = {
    mortgage: {
      amount: mortgage.value,
      recurring: document.querySelector(
        'input[name="mortgageRecurring"]:checked'
      )?.value,
    },
    utilities: {
      amount: utilities.value,
      recurring: document.querySelector(
        'input[name="utilitiesRecurring"]:checked'
      )?.value,
    },
    groceries: {
      amount: groceries.value,
      recurring: document.querySelector(
        'input[name="groceriesRecurring"]:checked'
      )?.value,
    },
    transport: {
      amount: transport.value,
      recurring: document.querySelector(
        'input[name="transportRecurring"]:checked'
      )?.value,
    },
    insurance: {
      amount: insurance.value,
      recurring: document.querySelector(
        'input[name="insuranceRecurring"]:checked'
      )?.value,
    },
  };

  // Save expenses
  let userExpense = JSON.parse(sessionStorage.getItem("userExpense")) || [];
  userExpense.push(expenses);
  sessionStorage.setItem("userExpense", JSON.stringify(userExpense));

  // Show current income
  let currentIncomeMessage = `
Income streams:
Salary: ${income.salary.amount} (Recurring: ${income.salary.recurring}) 
Rentals: ${income.rentals.amount} (Recurring: ${income.rentals.recurring}) 
Stocks: ${income.stocks.amount} (Recurring: ${income.stocks.recurring})
Freelance: ${income.freelance.amount} (Recurring: ${income.freelance.recurring})
Affiliate: ${income.affiliate.amount} (Recurring: ${income.affiliate.recurring})`;

  // Ask to add more income
  let newIncome = prompt(
    currentIncomeMessage + "\nAdd another income stream? (yes/no)"
  );

  if (newIncome === "yes") {
    let incomeName = prompt("Enter income source:");
    let newIncomeAmount = prompt("Enter the amount for this income stream:");
    let recurring = prompt("Is this income recurring? (yes/no)");

    income[incomeName] = {
      name: incomeName,
      amount: newIncomeAmount,
      recurring: recurring,
    };

    let updatedIncomeMessage = "Updated Income Streams:\n";
    for (let key in income) {
      updatedIncomeMessage += `${key} - Amount: ${income[key].amount}, Recurring: ${income[key].recurring}\n`;
    }
    alert(updatedIncomeMessage);
  }

  // Show current expenses
  let currentExpenseMessage = `
Expense streams:
Mortgage: ${expenses.mortgage.amount} (Recurring: ${expenses.mortgage.recurring}) 
Utilities: ${expenses.utilities.amount} (Recurring: ${expenses.utilities.recurring}) 
Groceries: ${expenses.groceries.amount} (Recurring: ${expenses.groceries.recurring})
Transport: ${expenses.transport.amount} (Recurring: ${expenses.transport.recurring})
Insurance: ${expenses.insurance.amount} (Recurring: ${expenses.insurance.recurring})`;

  // Ask to add more expenses
  let newExpense = prompt(
    currentExpenseMessage + "\nAdd another expense? (yes/no)"
  );

  if (newExpense === "yes") {
    let expenseName = prompt("Enter expense name:");
    let newExpenseAmount = prompt("Enter the amount for this expense:");
    let recurring = prompt("Is this expense recurring? (yes/no)");

    expenses[expenseName] = {
      name: expenseName,
      amount: newExpenseAmount,
      recurring: recurring,
    };

    let updatedExpenseMessage = "Updated Expense Streams:\n";
    for (let key in expenses) {
      updatedExpenseMessage += `${key} - Amount: ${expenses[key].amount}, Recurring: ${expenses[key].recurring}\n`;
    }
    alert(updatedExpenseMessage);
  }

  // Calculate total income
  let totalIncome = 0;
  for (let key in income) {
    totalIncome += Number(income[key].amount);
  }

  // Calculate total expenses
  let totalExpenses = 0;
  for (let key in expenses) {
    totalExpenses += Number(expenses[key].amount);
  }

  // Disposable income
  let disposableIncome = totalIncome - totalExpenses;

  // Ask for savings
  let savings = prompt("How much would you like to put into your savings?:");
  disposableIncome -= Number(savings);

  // Create list entry
  const li = document.createElement("li");
  li.textContent = `Total Income: ${totalIncome} || Total Expenses: ${totalExpenses} || Disposable Income: ${disposableIncome}`;
  alert("Amount of disposable income left: " + disposableIncome);
  list.appendChild(li);

  // Clear input fields
  name.value = "";
  surname.value = "";

  salary.value = "";
  rentals.value = "";
  stocks.value = "";
  freelance.value = "";
  affiliate.value = "";

  mortgage.value = "";
  utilities.value = "";
  groceries.value = "";
  transport.value = "";
  insurance.value = "";
});
/* Credit:
   Code adapted from a StackOverflow answer: 
   recurring: document.querySelector('input[name="stocksRecurring"]:checked')  ?.value,
 https://stackoverflow.com/questions/71288407/document-queryselectorinputname-nameofradiochecked-value-but-radio-not-c
*/
