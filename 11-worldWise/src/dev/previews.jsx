import React from "react";
import {Previews, ComponentPreview} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {CitiesProvider} from "../contexts/CitiesContext.jsx";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree />}>
			<ComponentPreview path="/CitiesProvider">
				<CitiesProvider />
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;
