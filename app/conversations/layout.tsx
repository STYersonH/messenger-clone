import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import { FullConversationType } from "../types";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const conversations = await getConversations();

	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className="h-full">
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}
