import {faker} from "@faker-js/faker";

export function createRandomPost() {
	return {
		id   : faker.datatype.uuid(),
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body : faker.hacker.phrase()
	};
}
