import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusherServer";
import getGroupExists from "@/app/actions/getGroupExists";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { nombreGrupo, userId, university, career } = body;

		// if (!currentUser?.id || !currentUser?.email) {
		// 	return new NextResponse("Unauthorized", { status: 401 });
		// }
		if (!userId || !university || !career) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const nombreGrupoUniversidadCarrera = `${university} - ${career}`;
		const nombreGrupoUniversidad = `${university}`;
		const nombreGrupoCarrera = `${career}`;

		var grupoUniversidadCarrera = {};
		// Grupo de la universidad y la carrera
		console.log(
			"existe el grupo?",
			getGroupExists(nombreGrupoUniversidadCarrera)
		);
		if (!(await getGroupExists(nombreGrupoUniversidadCarrera))) {
			// crear el grupo
			grupoUniversidadCarrera = await prisma.conversation.create({
				data: {
					name: nombreGrupoUniversidadCarrera,
					isGroup: true,
					users: {
						connect: [
							{
								id: userId,
								//id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
		} else {
			grupoUniversidadCarrera = await prisma.conversation.update({
				where: {
					name: nombreGrupoUniversidadCarrera,
				},
				data: {
					users: {
						connect: [
							{
								id: userId,
								//id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
		}

		// Grupo de la universidad
		var grupoUniversidad = {};
		if (!(await getGroupExists(nombreGrupoUniversidad))) {
			// crear el grupo
			grupoUniversidad = await prisma.conversation.create({
				data: {
					name: nombreGrupoUniversidad,
					isGroup: true,
					users: {
						connect: [
							{
								id: userId,
								//id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
		} else {
			grupoUniversidad = await prisma.conversation.update({
				where: {
					name: nombreGrupoUniversidad,
				},
				data: {
					users: {
						connect: [
							{
								id: userId,
								//id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
		}

		// Grupo de la carrera
		var grupoCarrera = {};
		if (!(await getGroupExists(nombreGrupoCarrera))) {
			// crear el grupo
			grupoCarrera = await prisma.conversation.create({
				data: {
					name: nombreGrupoCarrera,
					isGroup: true,
					users: {
						connect: [
							{
								id: userId,
								//id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
		} else {
			grupoCarrera = await prisma.conversation.update({
				where: {
					name: nombreGrupoCarrera,
				},
				data: {
					users: {
						connect: [
							{
								id: userId,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
		}

		return NextResponse.json(grupoCarrera);
	} catch (error: any) {
		console.log(error, "ERROR_GROUP_CONVERSATION");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
