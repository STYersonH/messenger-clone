// "use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
	label: string;
	icon: any;
	href: string;
	onClick: (() => Promise<undefined>) | undefined;
	active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
	label,
	icon: Icon,
	href,
	onClick,
	active,
}) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};
	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-black `,
					active ? `bg-black text-white` : `hover:text-black hover:bg-gray-200`
				)}
			>
				<Icon className="h-6 w-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
};

export default DesktopItem;
