import React from "react";

function Auth({ children }) {
	return (
		<div className="bg-gray-800 flex h-screen overflow-hidden justify-center">
			<div className="py-7 px-8 flex flex-col gap-2 bg-gray-100 w-3/5 min-w-max max-w-sm min-h-[10rem] self-center rounded-xl">
				{children}
			</div>
		</div>
	);
}

export function SignIn() {
	return (
		<Auth>
			{/* TITLE */}
			<h1 className="h4 py-3 mb-5 text-center">MASUK</h1>
			{/* FORM */}
			<form action="" className="flex flex-col gap-5">
				<AuthInput name={"test"} type={"email"} label={"Email"} />
				<AuthInput type={"password"} label={"Password"} />
				{/* BTN */}
				<div className="flex w-full p-3 items-center justify-center">
					<button className="text-md bg-gray-600 text-white py-2 px-10 hover:bg-gray-800">
						Submit
					</button>
				</div>
			</form>
		</Auth>
	);
}

export function SignUp() {
	return (
		<Auth>
			{/* TITLE */}
			<h1 className="h4 py-3 mb-5 text-center">MASUK</h1>
			{/* FORM */}
			<form action="" className="flex flex-col gap-5">
				<AuthInput name={"test"} type={"email"} label={"Email"} />
				<AuthInput type={"password"} label={"Password"} />
				{/* BTN */}
				<div className="flex w-full p-3 items-center justify-center">
					<button className="text-md bg-gray-600 text-white py-2 px-10 hover:bg-gray-800">
						Submit
					</button>
				</div>
			</form>
		</Auth>
	);
}

function AuthInput({ name, type, label }) {
	return (
		<div className="w-full flex flex-col">
			<label htmlFor={name} className="ml-1 pb-1 text-sm font-medium">
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				className="py-2 px-3 rounded-md text-white bg-gray-600"
			/>
		</div>
	);
}
