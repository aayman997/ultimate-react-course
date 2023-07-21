const CUSTOMER_CREATE_CUSTOMER = "customer/createCustomer";
const CUSTOMER_UPDATE_NAME = "customer/updateName";


const initialStateCustomer = {
	fullName  : "",
	nationalId: "",
	createdAt : ""
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


export const createCustomer = (fullName, nationalId) => {
	return {
		type   : CUSTOMER_CREATE_CUSTOMER,
		payload: {
			fullName,
			nationalId,
			createdAt: new Date().toISOString()
		}
	};
};
export const updateName = (fullName) => {
	return {
		type   : CUSTOMER_UPDATE_NAME,
		payload: fullName
	};
};

export default customerReducer;
