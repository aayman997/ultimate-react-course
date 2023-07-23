import {useState} from "react";
import AddNewBill from "./components/AddNewBill";
import FriendsView from "./components/Friends/FriendsView";

const initialFriends = [
	{
		id     : 118836,
		name   : "Clark",
		image  : "https://i.pravatar.cc/48?u=118836",
		balance: -7
	},
	{
		id     : 933372,
		name   : "Sarah",
		image  : "https://i.pravatar.cc/48?u=933372",
		balance: 20
	},
	{
		id     : 499476,
		name   : "Anthony",
		image  : "https://i.pravatar.cc/48?u=499476",
		balance: 0
	}
];
const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);
	return (
		<div className="app">
			<FriendsView friends={friends} onAddFriends={setFriends} setSelectedFriend={setSelectedFriend} selectedFriendId={selectedFriend?.id} />
			{
				selectedFriend
				? <AddNewBill key={selectedFriend.id} selectedFriend={selectedFriend} setFriends={setFriends} setSelectedFriend={setSelectedFriend} />
				: null
			}
		</div>
	);
};


export default App;
