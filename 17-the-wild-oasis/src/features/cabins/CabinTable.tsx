import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import { useCabins } from "./useCabins.ts";
import Empty from "../../ui/Empty.tsx";
import Table from "../../ui/Table.tsx";
import { NewCabin } from "../../../types/NewCabin.ts";
import Menus from "../../ui/Menus.tsx";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface CabinType extends NewCabin {
	id: number;
	image: string;
}

const CabinTable = () => {
	const { isLoading, error, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) {
		return <Spinner />;
	}

	if (!cabins?.length || error) {
		return <Empty resourceName="cabins" />;
	}

	const filterValue = searchParams.get("discount") ?? "all";
	let filteredCabins;
	if (filterValue === "all") {
		filteredCabins = cabins;
	}
	if (filterValue === "no-discount") {
		filteredCabins = cabins?.filter(cabin => cabin.discount === 0);
	}
	if (filterValue === "with-discount") {
		filteredCabins = cabins?.filter(cabin => cabin.discount !== 0);
	}

	const sortBy = searchParams.get("sortBy") ?? "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

	return (
		<Menus>
			<Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body data={sortedCabins as CabinType[]} render={(cabin: CabinType) => <CabinRow cabin={cabin} key={cabin.id} />} />
			</Table>
		</Menus>
	);
};
export default CabinTable;
