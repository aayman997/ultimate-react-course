import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import { useCabins } from "./useCabins.ts";
import Empty from "../../ui/Empty.tsx";
import Table from "../../ui/Table.tsx";
import { NewCabin } from "../../../types/NewCabin.ts";
import Menus from "../../ui/Menus.tsx";

interface CabinType extends NewCabin {
	id: number;
	image: string;
}

const CabinTable = () => {
	const { isLoading, error, cabins } = useCabins();

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <Empty resource="No cabins for now" />;
	}

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body data={cabins as CabinType[]} render={(cabin: CabinType) => <CabinRow cabin={cabin} key={cabin.id} />} />
			</Table>
		</Menus>
	);
};
export default CabinTable;
