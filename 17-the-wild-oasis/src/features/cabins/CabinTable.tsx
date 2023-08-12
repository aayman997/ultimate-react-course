import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import { useCabins } from "./useCabins.ts";
import Empty from "../../ui/Empty.tsx";
import Table from "../../ui/Table.tsx";
import { NewCabin } from "../../../types/NewCabin.ts";
import Menus from "../../ui/Menus.tsx";
import { useSearchParams } from "react-router-dom";

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
	let filteredCabins: CabinType[] = [];
	if (filterValue === "all") {
		filteredCabins = cabins;
	}
	if (filterValue === "no-discount") {
		filteredCabins = cabins?.filter(cabin => cabin.discount === 0);
	}
	if (filterValue === "with-discount") {
		filteredCabins = cabins?.filter(cabin => cabin.discount !== 0);
	}

	const fieldToProperty: Record<string, keyof CabinType> = {
		name        : "name",
		maxCapacity : "maxCapacity",
		regularPrice: "regularPrice",
		discount    : "discount"
	};

	const sortBy = searchParams.get("sortBy") ?? "startDate-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;

	const sortedCabins = filteredCabins.slice().sort((a, b) => {
		const aValue = a[fieldToProperty[field]] as number;
		const bValue = b[fieldToProperty[field]] as number;
		return (aValue - bValue) * modifier;
	});

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
				<Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin as CabinType} key={cabin.id} />} />
			</Table>
		</Menus>
	);
};
export default CabinTable;
