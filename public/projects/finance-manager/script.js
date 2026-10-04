const IncomeDashDisplay = document.getElementById('ieb-display-income');
const ExpensesDashDisplay = document.getElementById('ieb-display-expenses');
const BalanceDashDisplay = document.getElementById('ieb-display-balance');

const addTransactionForm = document.getElementById('add-transaction-form');
const addTransactionAmount = document.getElementById('add-transaction-amount');
const addTransactionDirection = document.getElementById('add-transaction-direction');
const addTransactionCategory = document.getElementById('add-transaction-category');
const addTransactionDate = document.getElementById('add-transaction-date');
const addTransactionSubmit = document.getElementById('add-transaction-submit');
const transactionItemsContainer = document.getElementById('transactions-list-items-container');

const addBudgetForm = document.getElementById('add-budget-form');
const addBudgetCategory = document.getElementById('add-budget-category');
const addBudgetAmount = document.getElementById('add-budget-amount');
const addBudgetTimeFrame = document.getElementById('add-budget-time-frame');
const addBudgetSubmit = document.getElementById('add-budget-submit');
const budgetItemsContainer = document.getElementById('budgets-list-items-container');

const iveBarLabels = document.getElementById('ive-bar-labels');
const iveAmountLabels = document.getElementById('ive-amount-labels');
const iveBarsContainer = document.getElementById('ive-bars-container');
const ivePointsContainer = document.getElementById('ive-points-container');
const iveLineConnector = document.getElementById('ive-line-connector');

const balanceAmountLabels = document.getElementById('balance-amount-labels');
const balanceBarsContainer = document.getElementById('balance-bars-container');
const balanceZeroLine = document.getElementById('balance-zero-line');

const iCompSpan = document.getElementById('i-comparison-display-span');
const eCompSpan = document.getElementById('e-comparison-display-span');
const bCompSpan = document.getElementById('b-comparison-display-span');
const iebCompTimeFrame = document.getElementById('ieb-comparison-time-frame');

const pieChartKey = document.getElementById('pie-chart-key');
const pieSlicesContainer = document.getElementById('pie-chart-slices-container');

//GLOBAL VARIABLES


let amountSpent = {
    "Housing and Bills": 0,
    "Transportation": 0,
    "Food": 0,
    "Clothing": 0,
    "Healthcare": 0,
    "Insurance": 0,
    "Items/Supplies": 0,
    "Personal": 0,
    "Debt": 0,
    "Savings": 0,
    "Gifts/Donations": 0,
    "Entertainment": 0,
    "Other": 0
};

let categoryColor = ["blueviolet", "crimson", "chartreuse", "darkmagenta", "darkorange", "gold", 
    "forestgreen", "indigo", "hotpink", "lightseagreen", "midnightblue", "tomato", "green"];

let totalIncome = 0;
let totalExpenses = 0;
let totalBalance = 0;

let transactionsArr = [];

let existingBudgets = []; //prevents duplicate budgets
let budgetsArr = []; //stores budget objects category, amount, element

//IVE REPORTS

const updateIve = (lastMonths, transactions) => {
    
    iveBarLabels.innerHTML = ""; //clear existing labels
    iveAmountLabels.innerHTML = "";
    iveBarsContainer.innerHTML = "";
    ivePointsContainer.innerHTML = "";
    iveLineConnector.innerHTML = "";

    lastMonths.forEach(({label}) => {
        const listItem = document.createElement('li');
        listItem.textContent = label;
        iveBarLabels.appendChild(listItem);
    });

    const monthlyTotals = lastMonths.map(({month, year}) => { //bar chart scale and vertical labels
        let monthTotalIncome = 0;
        let monthTotalExpenses = 0;

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            if(transactionDate.getMonth() === month && transactionDate.getFullYear() === year){
                if(transaction.direction === "incoming"){
                    monthTotalIncome += transaction.amount;
                }
                else if(transaction.direction === "outgoing"){
                    monthTotalExpenses += transaction.amount;
                }
            }
        });

        return Math.max(monthTotalIncome, monthTotalExpenses); //returns the larger of the two for chart scale
    });

    let maxAmount = Math.max(...monthlyTotals);
    if(maxAmount === 0){
        maxAmount = 100; //default scale if no transactions
    }

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxAmount))); //rounds to nearest 10 100 1000 etc
    maxAmount = Math.ceil(maxAmount / magnitude) * magnitude;

    const interval = maxAmount / 5;
    const labels = [];
    for(let i = 0; i <= 5; i++){
        labels.push(maxAmount -i * interval);
    };

    labels.forEach(label => {
        const vertListItem = document.createElement('li');
        vertListItem.textContent = `£${label.toLocaleString()}`;
        iveAmountLabels.appendChild(vertListItem);
    })

    lastMonths.forEach(({ month, year }) => {
        let monthTotalExpenses = 0;
        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            if(transactionDate.getMonth() === month && transactionDate.getFullYear() === year){
                if(transaction.direction === "outgoing"){
                    monthTotalExpenses += transaction.amount;
                }
            }
        })

        const bar = document.createElement('li');
        bar.classList.add('ive-bar');
        bar.title = `£${monthTotalExpenses.toFixed(2)} monthly expenses`;
        const heightPercentage = (monthTotalExpenses / maxAmount) * 100;
        bar.style.height = `${heightPercentage}%`;
        iveBarsContainer.appendChild(bar);
    })

    if (ivePointsContainer) {  //needed for errors in implementation. broke whole script.
    ivePointsContainer.innerHTML = '';

    lastMonths.forEach(({ month, year }, index) => {
        try {
            let monthTotalIncome = 0;
            transactions.forEach(transaction => {
                const transactionDate = new Date(transaction.date);
                if (transactionDate.getMonth() === month && transactionDate.getFullYear() === year) {
                if (transaction.direction === "incoming") {
                    monthTotalIncome += transaction.amount;
                }
                }
            });

            const point = document.createElement('li');
            point.classList.add('ive-point');
            point.title = `£${monthTotalIncome.toFixed(2)} monthly income`;

            const pointPositionPercentage = maxAmount > 0 ? (monthTotalIncome / maxAmount) * 100 : 0;
            point.style.bottom = `${pointPositionPercentage}%`

            const leftPercent = ((index + 0.5) / lastMonths.length) * 100;
            point.style.left = `${leftPercent}%`;

            if(monthTotalIncome === 0){
                point.style.display = 'none';
            }

            ivePointsContainer.appendChild(point);
        } catch (err) {
            console.error('Error creating income point for month index', index, err);
        }
    });

    //drawing line conncecting points using svg

    const pointsArr = Array.from(ivePointsContainer.querySelectorAll('.ive-point')).filter(point => point.style.display !== 'none').map(p => {
        const x = p.offsetLeft + p.offsetWidth / 2;
        const y = p.offsetTop + p.offsetHeight / 2;
        return `${x},${y}`;
    })

    if (pointsArr.length > 1) {
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute('points', pointsArr.join(' '));
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', 'lightgreen');
        polyline.setAttribute('stroke-width', '4');
        iveLineConnector.appendChild(polyline);
    }
}   
}

//BALANCE REPORTS

const updateBalanceChart = (lastMonths, transactions) => {
    balanceAmountLabels.innerHTML = "";
    balanceBarsContainer.innerHTML = "";

    const monthlyBalances = lastMonths.map(({ month, year }) => {
        let income = 0;
        let expenses = 0;
        
        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            if(transactionDate.getMonth() === month && transactionDate.getFullYear() === year){
               if(transaction.direction === "incoming"){
                    income += transaction.amount
               }
               else{
                    expenses += transaction.amount;
               }
                
            }
        })

        return income - expenses;

    });

    let maxAmount = Math.max(...monthlyBalances.map(b => Math.abs(b)));
    if(maxAmount === 0){
        maxAmount = 100;
    };

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxAmount)));
    maxAmount = Math.ceil(maxAmount / magnitude) * magnitude;

    const interval = maxAmount / 5;
    for(let i = 5; i >= - 5; i--){ //done this way to start at negative values
        const value = i * interval;
        const listItem = document.createElement('li');
        listItem.textContent = `£${value.toLocaleString()}`;
        balanceAmountLabels.appendChild(listItem);
    }

    const containerHeight = balanceBarsContainer.offsetHeight;
    const scale = containerHeight / (2 * maxAmount);
    const zeroLinePos = maxAmount * scale; //for absolute pixel positioning of zero line

    balanceZeroLine.style.bottom =  `${(zeroLinePos / containerHeight) * 100}%`;

    lastMonths.forEach(({ month, year, label }, index) => {
        const monthTotalBalance = monthlyBalances[index];
        const bar = document.createElement('li');
        bar.classList.add('balance-bar');
        bar.title = `£${monthTotalBalance.toFixed(2)} monthly balance during ${label}`;

        const barHeight =Math.abs(monthTotalBalance) * scale;

        if(monthTotalBalance >= 0){
            bar.style.bottom = `${(zeroLinePos / containerHeight) * 100}%`;
            bar.style.height = `${(barHeight / containerHeight) * 100}%`;
            bar.style.background = "linear-gradient(to bottom, pink, purple)"
        }
        else{
            bar.style.bottom = `${((zeroLinePos - barHeight) / containerHeight) * 100}%`;
            bar.style.height = `${(barHeight / containerHeight) * 100}%`;
            bar.style.background = "linear-gradient(to bottom, purple, blue)"
        }
        
        balanceBarsContainer.appendChild(bar);
    })

}

//IEB COMPARISON

const displayIebComparison = (lastMonths, transactions) => {
    iCompSpan.innerHTML = "";
    eCompSpan.innerHTML = "";
    bCompSpan.innerHTML = "";
    iebCompTimeFrame.innerHTML = "";

    const oldest = lastMonths[0];
    const newest = lastMonths[lastMonths.length - 1];

    let oldestIncome = 0;
    let oldestExpenses = 0;
    let newestIncome = 0;
    let newestExpenses = 0;

    transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        if(transactionDate.getMonth() === oldest.month && transactionDate.getFullYear() === oldest.year){
               if(transaction.direction === "incoming"){
                    oldestIncome += transaction.amount
               }
               else if(transaction.direction === "outgoing"){
                    oldestExpenses += transaction.amount;
               }
        }

        if(transactionDate.getMonth() === newest.month && transactionDate.getFullYear() === newest.year){
               if(transaction.direction === "incoming"){
                    newestIncome += transaction.amount
               }
               else if(transaction.direction === "outgoing"){
                    newestExpenses += transaction.amount;
               }
        }

    });

    const oldestBalance = oldestIncome - oldestExpenses;
    const newestBalance = newestIncome - newestExpenses;

    //calculating percentage difference

    const calcPercentChange = (oldValue, newValue) => {
        if(oldValue === 0 && newValue === 0){
            return 0;
        }
        if(oldValue === 0){
            return 100; //100% difference
        }
        return ((newValue - oldValue) / oldValue) * 100;
    }

    const arrowFunc = (percent) => {
        if(percent > 0) return `↑ ${percent.toFixed(1)}%`;
        if(percent < 0) return `↓ ${Math.abs(percent).toFixed(1)}%`;
        return `→ 0.0%`;
    }

    const incomeChange = calcPercentChange(oldestIncome, newestIncome);
    const expensesChange = calcPercentChange(oldestExpenses, newestExpenses);
    const balanceChange = calcPercentChange(oldestBalance, newestBalance);

    iCompSpan.textContent = arrowFunc(incomeChange);
    eCompSpan.textContent = arrowFunc(expensesChange);
    bCompSpan.textContent = arrowFunc(balanceChange);

    iCompSpan.style.color = incomeChange > 0 ? "green" : (incomeChange < 0 ? "red" : "black");
    eCompSpan.style.color = expensesChange < 0 ? "green" : (expensesChange > 0 ? "red" : "black");
    bCompSpan.style.color = balanceChange > 0 ? "green" : (balanceChange < 0 ? "red" : "black");

    iebCompTimeFrame.textContent = `Since: ${oldest.label}`;
}

//CATEGORIC EXPENDITURE

const categoryPieChart = () => {

    pieSlicesContainer.style.background = ""; //clear background to begin
    pieChartKey.innerHTML = "";

    const categories = Object.keys(amountSpent); //access the category names from object above
    const values = Object.values(amountSpent);

    const total = values.reduce((a, b) => a + b, 0); //figures out size of all slices together

    if(total === 0){
        pieSlicesContainer.style.background = "lightgray";
        return;
    }

    let parts = [];
    let currentAngle = 0;

    categories.forEach((category, i) => {
        const value = values[i];
        if (value > 0){
            const sliceAngle = (value / total) * 360;
            const startPoint = currentAngle;
            const endPoint = currentAngle + sliceAngle;

            parts.push(`${categoryColor[i]} ${startPoint}deg ${endPoint}deg`);
            currentAngle = endPoint;

            const sliceKeyItem = document.createElement('li');
            sliceKeyItem.classList.add('slice-key-item');
            sliceKeyItem.innerHTML += `
            <div class="pie-key-square" style="background: ${categoryColor[i]}"></div>
            ${category}: £${value.toFixed(2)}
            `;
            pieChartKey.appendChild(sliceKeyItem);
        }
    })

    pieSlicesContainer.style.background = `conic-gradient(${parts.join(", ")})`;

}

//DYNAMIC DISPLAY

const updateReports = () => {

    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const lastTwelveMonths = [];

    for(let i = 11; i >= 0; i--){ //do it this way around so the oldest is first
        let getDate = new Date(currentYear, currentMonth - i);
        const desiredMonth = monthsArr[getDate.getMonth()];
        const desiredYear = getDate.getFullYear();
        const desiredLabel = desiredMonth + " " + desiredYear; //optional label for IVE vertical formatting
        lastTwelveMonths.push({ month: getDate.getMonth(), year: desiredYear, label: desiredLabel });
    }

    updateIve(lastTwelveMonths, transactionsArr);
    updateBalanceChart(lastTwelveMonths, transactionsArr);
    displayIebComparison(lastTwelveMonths, transactionsArr);
    categoryPieChart();
}

const setMinDateInput = () => {
    const currentDate = new Date();

    const oldestAllowed = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);
    const oldestAllowedStr = oldestAllowed.toISOString().split("T")[0];

    addTransactionDate.setAttribute('min', oldestAllowedStr);
}

const updateDisplays = () => {
    IncomeDashDisplay.textContent = `£${totalIncome.toFixed(2)}`;
    ExpensesDashDisplay.textContent = `£${totalExpenses.toFixed(2)}`;
    totalBalance = totalIncome - totalExpenses;
    BalanceDashDisplay.textContent = `£${totalBalance.toFixed(2)}`;

    budgetsArr.forEach(budget => {
        const spent = amountSpent[budget.category];
        const available = budget.amount - spent;
        let percentageUsed = (spent / budget.amount) * 100;
        let percentageAvailable = 100 - percentageUsed;

        if(percentageUsed > 100){
            percentageUsed = 100;
        }

        if(percentageAvailable < 0){
            percentageAvailable = 0;
        }

        const budgetAvailableProgress = budget.element.querySelector('.budget-available-progress');
        const budgetUsedProgress = budget.element.querySelector('.budget-used-progress');
        const budgetAvailableAmount = budget.element.querySelector('.budget-available-amount');
        const budgetUsedAmount = budget.element.querySelector('.budget-used-amount');
        
        budgetAvailableProgress.style.width = `${percentageAvailable}%`;
        budgetUsedProgress.style.width = `${percentageUsed}%`;
        budgetAvailableAmount.textContent = `£${available.toFixed(2)}`;
        budgetUsedAmount.textContent = `£${spent.toFixed(2)}`;
    });
    updateReports();
}

//TRANSACTIONS LIST

const transactionAdded = (e) => {
    e.preventDefault();

    const direction = addTransactionDirection.value.toLowerCase();
    const category = addTransactionCategory.value;
    const amount = parseFloat(addTransactionAmount.value);

    const date = addTransactionDate.value;
    const currentDate = new Date();
    const oldestAllowed = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);

    if(new Date(date) < oldestAllowed){
        alert("Error: Date cannot be more than one year ago.");
        return;
    };

    if(direction === "outgoing" && category ==="Income/Salary"){
        alert("Error: Income cannot be outgoing.")
        return;
    }

    transactionsArr.push({ direction,category,amount,date});

    let formattedAmount = "";
    if(direction === "incoming"){
        formattedAmount = `+ £${amount.toFixed(2)}`;
        totalIncome += amount;
    }
    else if(direction === 'outgoing'){
        formattedAmount = `- £${amount.toFixed(2)}`;
        totalExpenses += amount;
    }
    else{
        alert("An error occured: No transaction direction selected.");
        return;
    }

    if(addTransactionAmount.value <= 0){
        alert("An error occured: Outgoing transaction amount must be greater than 0.");
        return;
    }

    if(amountSpent.hasOwnProperty(category) && direction === "outgoing"){
        amountSpent[category] += amount;  
    }

    const transactionItemDiv = document.createElement('div');
    transactionItemDiv.classList.add('transactions-list-item');

    transactionItemDiv.innerHTML += `
        <p>${addTransactionDate.value}</p>
        <p>${addTransactionCategory.value}</p>
        <p>${formattedAmount}</p>
        <button class="remove-btn">X</button>
    `; 

    transactionItemDiv.querySelector('.remove-btn').addEventListener('click', () => {
        transactionItemDiv.remove();

        const desiredIndex = transactionsArr.findIndex(t => //finds the current transaction in transactionsArr
            t.direction === direction &&
            t.category === category &&
            t.amount === amount &&
            t.date === date
        );

        if(desiredIndex > -1){
            transactionsArr.splice(desiredIndex, 1);
        };

        if(direction === "incoming"){
            totalIncome -= amount;
        }
        else if(direction === "outgoing"){
            totalExpenses -= amount;
            if(amountSpent.hasOwnProperty(category)){
                amountSpent[category] -= amount;
            }
        }

        updateDisplays();
    });

    transactionItemsContainer.prepend(transactionItemDiv);
    updateDisplays();
    addTransactionForm.reset();
}

//BUDGETS LIST

const budgetAdded = (e) => {
    e.preventDefault();

    const category = addBudgetCategory.value;
    const amount = parseFloat(addBudgetAmount.value);

    if(existingBudgets.includes(category)){
        alert("An error occured: Budget for this category already exists.");
        return;
    };

    existingBudgets.push(category);

    const percentageUsed = (amountSpent[category] / amount) * 100;
    const percentageAvailable = 100 - percentageUsed; 

    if(addBudgetAmount.value <= 0){
        alert("An error occured: Budget amount must be greater than 0.");
        return;
    }

    const budgetItemDiv = document.createElement('div');
    budgetItemDiv.classList.add('budgets-list-item');

    budgetItemDiv.innerHTML += `
    <p>${category}</p>
    <p>£${amount.toFixed(2)}</p>
    <div class="budget-used">
        <p class="budget-used-amount">£${amountSpent[category].toFixed(2)}</p>
        <div class="budget-used-progress-container">
            <div class="budget-used-progress" style="width: ${percentageUsed}%"></div>
        </div>
        <p>£${amount.toFixed(2)}</p>
    </div>
    <div class="budget-available">
        <p class="budget-available-amount">£${amount - amountSpent[category].toFixed(2)}</p>
        <div class="budget-available-progress-container">
            <div class="budget-available-progress" style="width: ${percentageAvailable}%"></div>
        </div>
        <p>£${amount.toFixed(2)}</p>
    </div>
    <button class="remove-btn">X</button>
    `;

    budgetItemDiv.querySelector('.remove-btn').addEventListener('click', () => {
        budgetItemDiv.remove();

        const index = existingBudgets.indexOf(category); //enables category budget to be added again
        if(index > -1){
            existingBudgets.splice(index, 1);
        }

        const budgetsArrIndex = budgetsArr.findIndex( b => b.category === category)
        if(budgetsArrIndex > - 1){
            budgetsArr.splice(budgetsArrIndex, 1);
        }

        updateDisplays();
        
    });

    budgetItemsContainer.appendChild(budgetItemDiv);

    budgetsArr.push({ category, amount, element: budgetItemDiv });
    updateDisplays();

    addBudgetForm.reset();
}

//EVENT LISTENERS

updateDisplays();
updateReports();
setMinDateInput();


addTransactionForm.addEventListener('submit', transactionAdded);
addBudgetForm.addEventListener('submit', budgetAdded);