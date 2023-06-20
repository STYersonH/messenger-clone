"use client"; // renderizar solo en el lado del cliente -> NEXT 13
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

// Limitar los valores a elegir
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
	// Solo se tendra 2 valores posibles para variant
	const [variant, setVariant] = useState<Variant>("LOGIN");
	const [isLoading, setIsLoading] = useState(false);

	// memoiza la funcion toggleVariant para que no se vuelva a crear
	// solo se crea una vez y se reutiliza en cada render
	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("REGISTER");
		} else {
			setVariant("LOGIN");
		}
	}, [variant]); //[variant] indica que solo se creara la funcion cuando variant cambie

	// se devuelve un objeto que se desestructura
	const {
		register, // se usa para registrar los inputs del formulario
		handleSubmit, // se usa para manejar el submit del formulario
		formState: { errors }, // se usa para manejar los errores del formulario
	} = useForm<FieldValues>({
		//useForm para manejar el estado y validacion del formulario
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// se usa para manejar el submit del formulario
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		// Si se esta enviando significa que debemos habilitar el loading
		setIsLoading(true);
		if (variant === "REGISTER") {
			//Axios register
		}
		if (variant === "LOGIN") {
			//NextAuth Signin
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		// NextAuth social Signin
	};

	return (
		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}></form>
			</div>
		</div>
	);
};

export default AuthForm;
