import {usePosts} from "../PostContext";

export function List() {
	const {posts} = usePosts();

	return (
		<ul>
			{posts.map((post) => (
				<li key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
				</li>
			))}
		</ul>
	);
}
