const { createStore } = Redux;

console.log('Starting banking a for multiple accounts');

const defaultState = {
    checking: 100,
    savings: 100
};

const action_deposit = 'deposit';
const action_withdrawal = 'withdrawal';

createDeposit(account, amount => {
    return {
        type: 'deposit',
        payload: {
            account,
            amount
        }
    }
});

createWithdrawal(account, amount => {
    return {
        type: 'wtihdrawal',
        payload: {
            account,
            amount
        }
    }
});


//Reducer thing... 

accounts(state=defaultState, action => {
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
});

const store = createStore( 
    accounts,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log('=== state has updated ===');
    const state = store.getState();
    console.log(state);
});



