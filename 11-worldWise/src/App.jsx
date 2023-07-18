import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Product from "./pages/Product/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {AppLayout} from "./pages/AppLayout/AppLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import {CityList} from "./components/City/CityList.jsx";
import {CountryList} from "./components/Country/CountryList.jsx";
import City from "./components/City/City.jsx";
import Form from "./components/Form/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";

const App = () => {

	return (
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Homepage />} />
					<Route path="product" element={<Product />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="login" element={<Login />} />
					<Route path="app" element={<AppLayout />}>
						<Route index element={<Navigate replace to="cities" />} />
						<Route path="cities" element={<CityList />} />
						<Route path="cities/:id" element={<City />} />
						<Route path="countries" element={<CountryList />} />
						<Route path="form" element={<Form />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
};

export default App;
