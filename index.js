const { createStore } = Redux;

console.log('Starting banking a for multiple accounts');

const defaultState = {
    checking: 100,
    savings: 100
};

const action_deposit = 'deposit';
const action_withdrawal = 'withdrawal';

const createDeposit = (account, amount) => {
    return {
        type: action_deposit,
        payload: {
            account,
            amount
        }
    }
};

const createWithdrawal = (account, amount) => {
    return {
        type: action_withdrawal,
        payload: {
            account,
            amount
        }
    }
};


//Reducer thing... 

const accounts = (state=defaultState, action) => {
    switch(action.type) {
        case action_deposit:
            return {
                ...state,
                [action.payload.account]: state[action.payload.account] + action.payload.amount
            }
        case action_withdrawal:
            return {
                ...state,
                [action.payload.account]: state[action.payload.account] - action.payload.amount
            }
    }   return state;
};

const store = createStore( 
    accounts,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log('=== state has updated ===');
    const state = store.getState();
    console.log(state);
    const checkingbalance = document.querySelector('#checking_balance');
    const savingsbalance = document.querySelector('#savings_balance');
    checkingbalance.innerHTML = state.checking;
    savingsbalance.innerHTML = state.savings;
});

const incrementButton = document.querySelector('#add');
const decrementButton = document.querySelector('#subtract');
const amount = document.querySelector('#amount');
const selectAccount = document.querySelector('#account_selection');
const checkingbalance = document.querySelector('#checking_account');
const savingsbalance = document.querySelector('#savings_account')


// const savingsbalance = document.querySelector('input[name="savings"]:checked').value;




incrementButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(amount.value)
    if (checkingbalance.checked) {
        store.dispatch(createDeposit(checkingbalance.value, amountValue));
    }else if (savingsbalance.checked) {
        store.dispatch(createDeposit(savingsbalance.value, amountValue));
    }
    // console.log("amount to increment is", amount.value)
    // console.log(amount.value)
    console.log(amount);
    console.log(checkingbalance);

});
decrementButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(amount.value)
    console.log("amount to decrement", amount.value)
    if (checkingbalance.checked) {
        store.dispatch(createWithdrawal(checkingbalance.value, amountValue));
    }else if (savingsbalance.checked) {
            store.dispatch(createDeposit(savingsbalance.value, amountValue));
        }
    store.dispatch(createWithdrawal(savingsbalance, amountValue))
    console.log(savingsbalance.value);
});



