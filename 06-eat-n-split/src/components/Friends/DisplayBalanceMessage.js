const DisplayBalanceMessage = ({friendName, balance}) => {
	if (balance > 0) {
		return <p className="green">{friendName} owes you {balance}$</p>;
	}
	if (balance < 0) {
		return <p className="red">You owe {friendName} {Math.abs(balance)}$</p>;
	}
	return <p>You and {friendName} are even</p>;
};
export default DisplayBalanceMessage;
