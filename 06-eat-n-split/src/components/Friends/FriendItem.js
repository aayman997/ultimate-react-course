import Button from "../Button";
import DisplayBalanceMessage from "./DisplayBalanceMessage";

const FriendItem = ({friend, setSelectedFriend, selectedFriendId}) => {
    return (
        <li>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            <DisplayBalanceMessage friendName={friend.name} balance={friend.balance} />
            <Button
                onClick={() => setSelectedFriend(() => friend.id === selectedFriendId ? null : friend)}
            >
                {selectedFriendId === friend.id ? "Close" : "Select"}
            </Button>
        </li>
    );
};

export default FriendItem;
