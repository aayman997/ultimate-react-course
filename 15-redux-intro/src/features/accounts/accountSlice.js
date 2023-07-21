import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	balance    : 0,
	loan       : 0,
	loanPurpose: "",
	isLoading  : false
};

const accountSlice = createSlice({
	name    : "account",
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
		},
		withdraw(state, action) {
			state.balance -= action.payload;
		},
		requestLoan: {
			prepare(amount, purpose) {
				return {
					payload: {amount, purpose}
				};
			},
			reducer(state, action) {
				if (state.loan > 0) return;
				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.loanPurpose;
				state.balance += action.payload.amount;
			}
		},
		payLoan(state) {
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = "";
		},
		convertingCurrency(state) {
			state.isLoading = true;
		}
	}
});


export const deposit = (amount, currency) => {
	if (currency === "USD") {
		return {type: "account/deposit", payload: amount};
	}
	return async (dispatch, getState) => {
		dispatch({type: "account/convertingCurrency"});
		try {
			const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
			const data = await res.json();
			const converted = data.rates.USD;
			if (!res.ok) {
				throw new Error("Something went wrong while converting currency");
			}
			dispatch({type: "account/deposit", payload: converted});
		} catch (err) {
			console.error(err.message);
		}
	};
};

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;
export default accountSlice.reducer;
