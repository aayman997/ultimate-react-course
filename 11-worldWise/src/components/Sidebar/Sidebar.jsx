import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo.jsx";
import React from "react";
import {AppNav} from "../AppNav/AppNav.jsx";
import {Outlet} from "react-router-dom";

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
				</p>
			</footer>
		</div>
	);
};
