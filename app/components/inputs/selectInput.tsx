"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

// importar las universidades
import { universidades } from "@/app/data/universidades";
import { carreras } from "@/app/data/carreras";

interface SelectInputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
	choosedUniversity?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
	label,
	id,
	type = "text",
	required,
	register,
	errors,
	disabled,
	choosedUniversity,
}) => {
	return (
		<div>
			<label className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="mt-2">
				<select
					id={id}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						"form-input block w-full rounded-md py-1.5 text-gray-700 text-sm  shadow-sm ring-2 ring-gray-50 focus:ring-[1.5px] focus:ring-black focus:ring-inset",
						errors[id] && "focus:ring-red-500",
						disabled && "opacity-50 cursor-default"
					)}
				>
					<option disabled selected value="">
						{id === "universidad"
							? "Seleccione una universidad"
							: "Seleccione una carrera"}
					</option>
					{id === "universidad"
						? universidades.map((universidad) => (
								<option key={universidad.id} value={universidad.acronimo}>
									{universidad.nombre}
								</option>
						  ))
						: carreras
								.filter(
									(carrera) => carrera.universidad_id === choosedUniversity
								)
								.map((carrera) => (
									<option key={carrera.id} value={carrera.carrera}>
										{carrera.carrera}
									</option>
								))}
				</select>
			</div>
		</div>
	);
};

export default SelectInput;
