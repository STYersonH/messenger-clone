// Layout for all users

import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

// es async por que fetch users directamente desde la base de datos
const UserLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className="h-full">{children}</div>
		</Sidebar>
	);
};

export default UserLayout;
