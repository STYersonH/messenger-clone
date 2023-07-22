import Sidebar from "../components/sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import { FullConversationType } from "../types";

const groupLayout = async ({ children }: { children: React.ReactNode }) => {
	const conversations = await getConversations();
	const users = await getUsers();

	return (
		<Sidebar>
			<div className="h-full">{children}</div>
		</Sidebar>
	);
};

export default groupLayout;
