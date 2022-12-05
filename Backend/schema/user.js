exports.login = {
    email: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Email cannot be empty",
    },
    password: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Password cannot be empty",
    },
};
exports.create = {
    email: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Email cannot be empty",
    },
    password: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Password cannot be empty",
    },
    role: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Role cannot be empty",
    },
    fullName: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Full name cannot be empty",
    },
    mobileCode: {
        in: ["body"],
        notEmpty: false,
        errorMessage: "Mobile Code cannot be empty",
        isString: {
            errorMessage: "Mobile Code must be string",
        },
    },
    mobileNumber: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Mobile number cannot be empty",
        isString: {
            errorMessage: "Mobile number must be string",
        },
    },
};
exports.update = {
    email: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Email cannot be empty",
    },
    fullName: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Full name cannot be empty",
    },
    mobileCode: {
        in: ["body"],
        notEmpty: false,
        errorMessage: "Mobile Code cannot be empty",
    },
    mobileNumber: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Mobile number cannot be empty",
    },
};
exports.senOtpSchema = {
    countryCode: {
        in: ["body"],
        isString: {
            errorMessage: "Country Code must be string",
        },
        notEmpty: true,
        errorMessage: "Country Code cannot be empty",
    },
    mobileNumber: {
        in: ["body"],
        isString: {
            errorMessage: "Mobile number must be string",
        },
        notEmpty: true,
        errorMessage: "Mobile number cannot be empty",
    },
};
exports.verifyOtpSchema = {
    countryCode: {
        in: ["body"],
        isString: {
            errorMessage: "Country Code must be string",
        },
        notEmpty: true,
        errorMessage: "Country Code cannot be empty",
    },
    mobileNumber: {
        in: ["body"],
        isString: {
            errorMessage: "Mobile number must be string",
        },
        notEmpty: true,
        errorMessage: "Mobile number cannot be empty",
    },
    tempOtp: {
        in: ["body"],
        isString: {
            errorMessage: "Temp OTP must be string",
        },
        notEmpty: true,
        errorMessage: "Temp OTP cannot be empty",
    },
};
