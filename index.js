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

incrementButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("amount to increment is", amount.value)
    console.log(selectAccount.value)
    const amountValue = parseInt(amount.value)
    store.dispatch(createDeposit(selectAccount.value, amountValue));
});
decrementButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("amount to decrement", amount.value)
    const amountValue = parseInt(amount.value)
    store.dispatch(createWithdrawal(selectAccount.value, amount.value))
});



