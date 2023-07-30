"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import ConversationBox from "../../components/chats/ConversationBox";
import NewChatModal from "./NewChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusherClient";
import { find, remove } from "lodash";

interface ConversationListProps {
	initialItems: FullConversationType[];
	users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
	initialItems,
	users,
}) => {
	const session = useSession();
	const [items, setItems] = useState(initialItems);
	// para abrir el modal de crear conversacion grupal
	const [isModalOpen, setIsModalOpen] = useState(false);

	const router = useRouter();

	const { conversationId, isOpen } = useConversation();

	// ya no tenemos que repetir el codigo de suscripcion a pusher cada vez que se renderiza el componente
	const pusherKey = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	// cada vez que se cree una nueva conversacion o se elimine una conversacion, en tiempo real se vera reflejado en la lista de conversaciones
	useEffect(() => {
		if (!pusherKey) return;

		pusherClient.subscribe(pusherKey);

		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) {
					return current;
				}

				return [conversation, ...current];
			});
		};

		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id) {
						return {
							...currentConversation,
							messages: conversation.messages,
						};
					}

					return currentConversation;
				})
			);
		};

		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				// no debe ser igual al id que se recibio en el pusher
				return [...current.filter((convo) => convo.id !== conversation.id)];
			});

			// ya no mostrar los mensajes
			if (conversationId === conversation.id) {
				router.push("/conversations");
			}
		};

		pusherClient.bind("conversation:new", newHandler);
		pusherClient.bind("conversation:update", updateHandler);
		pusherClient.bind("conversation:remove", removeHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind("conversation:new", newHandler);
			pusherClient.unbind("conversation:update", updateHandler);
			pusherClient.unbind("conversation:remove", removeHandler);
		};
	}, [pusherKey, conversationId, router]);

	return (
		<>
			<NewChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<aside
				className={clsx(
					`fixed inset-y-0 pb-20 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
					isOpen ? "hidden" : "block w-full left-0"
				)}
			>
				<div className="px-5">
					<div className="flex items-center justify-between mb-4 pt-4">
						<div className="text-2xl font-bold text-neutral-800">Messages</div>
						<div
							className="rounded-full p-2  text-gray-600 cursor-pointer hover:transform hover:scale-110 transition"
							onClick={() => setIsModalOpen(true)}
						>
							<TiUserAdd className="text-black" size={25} />
						</div>
					</div>
					{items
						.filter((item) => !item.isGroup)
						.map((item) => (
							<ConversationBox
								key={item.id}
								data={item}
								selected={conversationId === item.id}
							/>
						))}
				</div>
			</aside>
		</>
	);
};

export default ConversationList;
