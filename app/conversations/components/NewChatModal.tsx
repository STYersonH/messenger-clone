"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/inputs/Select";
import SelectUser from "@/app/components/inputs/SelectUser";
import Input from "@/app/components/inputs/input";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface NewChatModalProps {
	isOpen?: boolean;
	onClose: () => void;
	users: User[];
}

const NewChatModal: React.FC<NewChatModalProps> = ({
	isOpen,
	onClose,
	users,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register, // para registrar los campos del formulario que en este caso son name y members
		handleSubmit, // para manejar la presentacion de los datos del formulario, se toma una funcion que se ejecuta cuando se envia el formulario
		setValue, // para establecer el valor de los campos del formulario
		watch, // para observar los cambios en los campos del formulario, la funcion toma como parametro el nombre del campo a observar y retorna el valor actual del campo
		formState: { errors },
	} = useForm<FieldValues>({
		// especifica los valores por defecto de los campos
		defaultValues: {
			conversationWith: {},
		},
	});

	const conversationWith = watch("conversationWith"); // observa los cambios en el campo members
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		console.log(data);

		axios
			.post("/api/conversations", {
				userId: data.conversationWith.value, //se crea pero no es un grupo
			})
			.then((data) => {
				// router.refresh(); // recarga la pagina
				onClose(); // cierra el modal
				router.push(`/conversations/${data.data.id}`);
			})
			.catch(() => toast.error("Something went wrong!"))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* space-y-12 : espacio entre los elementos hijos */}
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Create a new chat
						</h2>
						<p className="mt-3 text-sm leading-6 gap-y-8">
							<SelectUser
								disabled={isLoading}
								label="new conversation with"
								options={users.map((user) => ({
									value: user.id,
									label: user.name,
								}))}
								onChange={(value) =>
									setValue("conversationWith", value, {
										shouldValidate: true,
									})
								}
								value={conversationWith}
							/>
						</p>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<Button
						disabled={isLoading}
						onClick={onClose}
						type="button"
						secundary
					>
						Cancel
					</Button>
					<Button disabled={isLoading} type="submit">
						Create
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default NewChatModal;
