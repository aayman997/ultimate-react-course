import FriendItem from "./FriendItem";

const FriendsList = ({friends, setSelectedFriend, selectedFriendId}) => {
	return (
		<ul>
			{
				friends.map(friend => (
					<FriendItem key={friend.id} friend={friend} setSelectedFriend={setSelectedFriend} selectedFriendId={selectedFriendId} />
				))
			}
		</ul>
	);
};
export default FriendsList;
