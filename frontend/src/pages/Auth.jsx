import React from "react";

export default function Auth() {
	return (
		<div className="bg-gray-800 flex h-screen overflow-hidden justify-center">
			<div className="py-10 px-10 flex flex-col gap-2 bg-gray-100 w-3/5 min-w-max max-w-max min-h-[10rem] self-center rounded-xl">
				{/* TITLE */}
				<h1 className="h4 py-3 text-center">LOGIN</h1>
				{/* FORM */}
				<form action="" className="flex flex-col gap-5">
					<AuthInput name={"test"} />
					<AuthInput />
					{/* BTN */}
					<div className="flex w-full p-3 items-center justify-center">
						<button className="bg-green-400 py-2 px-4 rounded-md ">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export function AuthInput({ name }) {
	return (
		<div className="w-full flex flex-col">
			<label htmlFor={name} className="ml-1 pb-1">
				Label
			</label>
			<input
				type="text"
				name={name}
				id={name}
				className="py-2 px-3 rounded-md text-white bg-gray-600"
			/>
		</div>
	);
}
