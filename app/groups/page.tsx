"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";

import EmptyState from "../components/EmptyState";

export default function Groups() {
	const { isOpenGroup } = useConversation();

	return (
		<div
			className={clsx(
				"lg:pl-80 h-full lg:block",
				isOpenGroup ? "block" : "hidden"
			)}
		>
			<EmptyState />
		</div>
	);
}
