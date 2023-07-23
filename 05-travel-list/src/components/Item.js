const Item = ({item, onDoneItem, onDeleteItem}) => {
	return (
		<li>
			<input type="checkbox" value={item.packed} onChange={() => onDoneItem(item.id)} />
			<span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
};
export default Item;
