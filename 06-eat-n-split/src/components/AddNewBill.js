import {useState} from "react";
import Button from "./Button";
import Input from "./Input";

const AddNewBill = ({selectedFriend, setFriends, setSelectedFriend}) => {
	const [billValue, setBillValue] = useState("");
	const [youExpense, setYouExpense] = useState("");
	const [whoPaid, setWhoPaid] = useState("");

	const handleSplitBill = (e) => {
		e.preventDefault();
		setFriends(friendsArr => {
			const friendIndex = friendsArr.findIndex(friend => friend.id === selectedFriend.id);
			const newArr = friendsArr;
			if (+e.target["whoPaid"].value === 0) {
				newArr[friendIndex].balance += +e.target["friendExpense"].value;
			} else {
				newArr[friendIndex].balance -= +e.target["yourExpense"].value;
			}
			return [...newArr];
		});
		setBillValue("");
		setYouExpense("");
		setWhoPaid("");
		setSelectedFriend(null);
	};
	return (
		<form className="form-split-bill" onSubmit={handleSplitBill}>
			<h2>split a bill with {selectedFriend.name}</h2>
			<Input id="billValue" type="number" value={billValue} onChange={e => setBillValue(e.target.value)}>💰 Bill value</Input>
			<Input id="yourExpense" type="number" value={youExpense} onChange={e => setYouExpense(e.target.value)}>🙍‍♂️ Your expense</Input>
			<Input id="friendExpense" disabled type="number" value={billValue - youExpense}>🧑‍🤝‍🧑{selectedFriend.name}'s expense</Input>
			<label htmlFor="whoPaid">🤑 Who is paying the bill?</label>
			<select id="whoPaid" value={whoPaid} onChange={e => setWhoPaid(e.target.value)}>
				<option value="0">You</option>
				<option value="1">{selectedFriend.name}</option>
			</select>
			<Button disabled={!billValue}>Split bill</Button>
		</form>
	);
};

export default AddNewBill;
