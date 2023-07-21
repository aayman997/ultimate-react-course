import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import {ProtectedRoutes} from "./pages/ProtectedRoutes.jsx";
import {CityList} from "./components/City/CityList.jsx";
import {CountryList} from "./components/Country/CountryList.jsx";
import City from "./components/City/City.jsx";
import Form from "./components/Form/Form.jsx";
import {lazy, Suspense} from "react";
import SpinnerFullPage from "./components/Spinner/SpinnerFullPage.jsx";

// Lazy Loading
const Homepage = lazy(() => import("./pages/Homepage/Homepage.jsx"));
const Product = lazy(() => import("./pages/Product/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

const App = () => {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path="product" element={<Product />} />
							<Route path="pricing" element={<Pricing />} />
							<Route path="login" element={<Login />} />
							<Route
								path="app" element={
								<ProtectedRoutes>
									<AppLayout />
								</ProtectedRoutes>}
							>
								<Route index element={<Navigate replace to="cities" />} />
								<Route path="cities" element={<CityList />} />
								<Route path="cities/:id" element={<City />} />
								<Route path="countries" element={<CountryList />} />
								<Route path="form" element={<Form />} />
							</Route>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
};

export default App;
