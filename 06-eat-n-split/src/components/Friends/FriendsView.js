import {useState} from "react";
import Button from "../Button";
import AddNewFriend from "./AddNewFriend";
import FriendsList from "./FriendsList";

const FriendsView = ({friends, onAddFriends, setSelectedFriend, selectedFriendId}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <aside className="sidebar">
            <FriendsList friends={friends} setSelectedFriend={setSelectedFriend} selectedFriendId={selectedFriendId} />
            {
                isOpen && <AddNewFriend onAddFriends={onAddFriends} setIsOpen={setIsOpen} />
            }
            <Button onClick={() => setIsOpen(cur => !cur)}>{isOpen ? "Close" : "Add Friend"}</Button>
        </aside>
    );
};

export default FriendsView;
