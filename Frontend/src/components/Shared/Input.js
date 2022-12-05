const Input = ({ type, register, title, value, className, name, onChange, isdisabled }) => {
	return (
		<input
			type={type}
			placeholder={title}
			name={name}
			value={value}
			className={`d-block w-full p-3 outline-none rounded-md font-semibold bg-white-light border border-hrColor text-black-200  ${className}`}
			onChange={onChange}
			disabled={isdisabled}
			/* eslint-disable-next-line react/jsx-props-no-spreading */
			{...register}
		/>
	);
};

export default Input;
