exports.create = {
    name: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Name cannot be empty",
    },
    description: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Description cannot be empty",
    },
    UserId: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "User Id cannot be empty",
    },
};

exports.update = {
    name: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Name cannot be empty",
    },
    description: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Description cannot be empty",
    },
    UserId: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "User Id cannot be empty",
    },
};

exports.status = {
    status: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Status cannot be empty",
    },
};
