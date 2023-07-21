const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUEST_LOAN = "account/requestLoan";
const ACCOUNT_PAY_LOAN = "account/payLoan";
const ACCOUNT_CONVERTING_CURRENCY = "account/convertingCurrency";

const initialState = {
	balance    : 0,
	loan       : 0,
	loanPurpose: "",
	isLoading  : false
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACCOUNT_DEPOSIT:
			return {
				...state,
				balance  : state.balance + action.payload,
				isLoading: false
			};
		case ACCOUNT_WITHDRAW:
			if (state.balance <= 0 || action.payload > state.balance) {
				return state;
			}
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
		case ACCOUNT_CONVERTING_CURRENCY:
			return {
				...state,
				isLoading: true
			};
		default:
			return state;
	}
};

export const deposit = (amount, currency) => {
	if (currency === "USD") {
		return {type: ACCOUNT_DEPOSIT, payload: amount};
	}
	return async (dispatch, getState) => {
		dispatch({type: ACCOUNT_CONVERTING_CURRENCY});
		// API call
		try {
			const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
			const data = await res.json();
			const converted = data.rates.USD;
			if (!res.ok) {
				throw new Error("Something went wrong while converting currency");
			}
			dispatch({type: ACCOUNT_DEPOSIT, payload: converted});
		} catch (err) {
			console.error(err.message);
		}
	};
};

export const withdraw = (amount) => {
	return {type: ACCOUNT_WITHDRAW, payload: amount};
};

export const requestLoan = (amount, purpose) => {
	return {
		type   : ACCOUNT_REQUEST_LOAN,
		payload: {
			amount,
			purpose
		}
	};

};

export const payLoan = () => {
	return {type: ACCOUNT_PAY_LOAN};
};

export default accountReducer;
