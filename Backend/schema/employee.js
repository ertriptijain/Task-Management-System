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
    fullName: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Full name cannot be empty",
    },
    mobileCode: {
        in: ["body"],
        notEmpty: false,
        errorMessage: "Mobile Code can be empty",
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
    password: {
        in: ["body"],
        notEmpty: false,
        errorMessage: "Password can be empty",
    },
    fullName: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Full name cannot be empty",
    },
    mobileCode: {
        in: ["body"],
        notEmpty: false,
        errorMessage: "Mobile Code can be empty",
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
