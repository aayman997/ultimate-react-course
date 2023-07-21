import {createStore, combineReducers} from "redux";

const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
const ACCOUNT_PAY_LOAN = "account/payLoan";
const CUSTOMER_CREATE_CUSTOMER = "customer/createCustomer";
const CUSTOMER_UPDATE_NAME = "customer/updateName";

const initialState = {
	balance    : 0,
	loan       : 0,
	loanPurpose: ""
};
const initialStateCustomer = {
	fullName  : "",
	nationalId: "",
	createdAt : ""
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACCOUNT_DEPOSIT:
			return {
				...state,
				balance: state.balance + action.payload
			};
		case ACCOUNT_WITHDRAW:
			return {
				...state,
				balance: state.balance - action.payload
			};
		case ACCOUNT_REQUEST_LOAN:
			if (state.loan > 0) {
				return state;
			}
			return {
				...state,
				loan       : action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance    : state.balance + action.payload.amount
			};
		case ACCOUNT_PAY_LOAN:
			return {
				...state,
				loan       : 0,
				loanPurpose: "",
				balance    : state.balance - state.loan
			};
		default:
			return state;
	}
};


const customerReducer = (state = initialStateCustomer, action) => {
	switch (action.type) {
		case CUSTOMER_CREATE_CUSTOMER:
			return {
				...state,
				fullName  : action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt : action.payload.createdAt
			};
		case CUSTOMER_UPDATE_NAME:
			return {...state, fullName: action.payload};
		default:
			return state;
	}
};


const deposit = (amount) => {
	return {type: ACCOUNT_DEPOSIT, payload: amount};
};

const withdraw = (amount) => {
	return {type: ACCOUNT_WITHDRAW, payload: amount};
};

const requestLoan = (amount, purpose) => {
	return {
		type   : ACCOUNT_REQUEST_LOAN,
		payload: {
			amount,
			purpose
		}
	};

};

const payLoan = () => {
	return {type: ACCOUNT_PAY_LOAN};
};


const createCustomer = (fullName, nationalId) => {
	return {
		type   : CUSTOMER_CREATE_CUSTOMER,
		payload: {
			fullName,
			nationalId,
			createdAt: new Date().toISOString()
		}
	};
};
const updateName = (fullName) => {
	return {
		type   : CUSTOMER_UPDATE_NAME,
		payload: fullName
	};
};


const rootReducer = combineReducers({
	account : accountReducer,
	customer: customerReducer
});

const storeV1 = createStore(rootReducer);

storeV1.dispatch(deposit(500));
console.log(storeV1.getState());

storeV1.dispatch(withdraw(200));
console.log(storeV1.getState());

storeV1.dispatch(requestLoan(1000, "Buy a car"));
console.log(storeV1.getState());

storeV1.dispatch(payLoan());
console.log(storeV1.getState());


storeV1.dispatch(createCustomer("Ahmed Ayman", 29706041300174));
console.log(storeV1.getState());
storeV1.dispatch(updateName("Ahmed Ayman El-Sayed"));
console.log(storeV1.getState());
