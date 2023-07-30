import Image from "next/image";
import React from "react";

const EmptyState = () => {
	return (
		<div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-stone-200">
			<div className="text-center items-center flex flex-col">
				<h3 className="mt-2 text-2xl font-semibold text-gray-900">
					<img
						//src="/images/unichatLogoGray2.png"
						src="/images/unichatLogo.png"
						alt="Logo"
						className="mx-auto w-auto h-[90px] "
					/>
				</h3>
			</div>
		</div>
	);
};

export default EmptyState;
