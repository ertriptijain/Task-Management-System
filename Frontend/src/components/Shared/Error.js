const Error = ({ errors, className }) => {
	return (
		<>
			{Array.isArray(errors) ? (
				errors.map((e) => (
					<p key={e} className={`text-danger ${className}`}>
						{e}
					</p>
				))
			) : (
				<p className={`text-danger  ${className}`}>{errors}</p>
			)}
		</>
	);
};
export default Error;
