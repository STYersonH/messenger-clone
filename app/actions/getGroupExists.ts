import prisma from "@/app/libs/prismadb";

const getGroupExists = async (nombreGrupo: string) => {
	try {
		console.log("buscando grupo");
		const group = await prisma.conversation.findUnique({
			where: {
				name: nombreGrupo,
			},
		});

		// si hay group retornar true
		// si no hay group retornar false
		if (group) {
			return true;
		} else {
			return false;
		}

		//return group;
	} catch (error: any) {
		return [];
	}
};

export default getGroupExists;
