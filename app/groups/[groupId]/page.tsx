import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "@/app/components/chats/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
	groupId: string;
}

const GroupId = async ({ params }: { params: IParams }) => {
	const conversation = await getConversationById(params.groupId);
	const messages = await getMessages(params.groupId);

	if (!conversation) {
		return (
			<div className="lg:pl-80 h-full">
				<div className="h-full flex flex-col ">
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col ">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default GroupId;
