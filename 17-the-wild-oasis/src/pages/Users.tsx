import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm.tsx";

function NewUsers() {
	return (
		<>
			{/*To create user's table*/}

			<Heading as="h1">Create a new user</Heading>
			<SignupForm />
		</>

	);
}

export default NewUsers;
