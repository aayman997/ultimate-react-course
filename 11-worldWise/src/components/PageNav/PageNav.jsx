import {NavLink} from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo.jsx";
import {useAuth} from "../../contexts/FakeAuthContext.jsx";

export const PageNav = () => {
	const {isAuthenticated} = useAuth();
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				{
					!isAuthenticated &&
					<li>
						<NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
					</li>
				}
			</ul>
		</nav>
	);
};
