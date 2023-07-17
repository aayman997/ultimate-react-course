import {useState} from "react";
import {usePosts} from "../PostContext";
import {faker} from "@faker-js/faker";

export function FormAddPost() {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const {onAddPost} = usePosts();

	const handleSubmit = function (e) {
		e.preventDefault();
		if (!body || !title) {
			return;
		}
		onAddPost({id: faker.datatype.uuid(), title, body});
		setTitle("");
		setBody("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Post title"
			/>
			<textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder="Post body"
			/>
			<button>Add post</button>
		</form>
	);
}
