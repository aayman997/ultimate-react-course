import {useSelector, connect} from "react-redux";

function formatCurrency(value) {
	return new Intl.NumberFormat("en", {
		style   : "currency",
		currency: "USD"
	}).format(value);
}

function BalanceDisplay() {
	const {balance} = useSelector(state => state.account);

	return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
	return {
		balance: state.account.balance
	};
}

export default connect(mapStateToProps)(BalanceDisplay);
