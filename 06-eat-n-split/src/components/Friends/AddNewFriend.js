import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import Button from "../Button";
import Input from "../Input";

const AddNewFriend = ({onAddFriends, setIsOpen}) => {
	const [friendData, setFriendData] = useState({});
	const handleAddFriend = (e) => {
		e.preventDefault();
		onAddFriends(cur => [...cur, friendData]);
		setIsOpen(false);
	};
	useEffect(() => {
		const friend = {
			id     : faker.string.uuid(),
			name   : faker.person.firstName(),
			image  : faker.image.urlLoremFlickr({category: "people", width: 48, height: 48}),
			balance: 0
		};
		setFriendData(friend);
	}, []);

	return (
		<form onSubmit={handleAddFriend} className="form-add-friend">
			<Input id="FriendName" type="text" defaultValue={friendData.name}>🧑‍🤝‍🧑Friend name</Input>
			<Input id="ImageURL" type="url" defaultValue={friendData.image} disabled>🖼️ Image URL</Input>
			<Button>Add</Button>
		</form>
	);
};

export default AddNewFriend;
