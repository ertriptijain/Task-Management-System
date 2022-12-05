const _ = require("lodash");

const OPTIONS = {
    appVersion: "1.0.0",
    appSchemaUrl: "task_management",
    timeZone: "Asia/Kolkata",
    randomUsernameSize: 4,
    resetPasswordExpireInDays: 720,
    defaultTax: 2,
    otpExpireInDays: 1,
    usersRoles: {
        SUPER_ADMIN: "SUPER_ADMIN",
        ADMIN: "ADMIN",
        EMPLOYEE: "EMPLOYEE",
        getAllRolesAsArray: function () {
            return [OPTIONS.usersRoles.SUPER_ADMIN, OPTIONS.usersRoles.ADMIN, OPTIONS.usersRoles.EMPLOYEE];
        },
    },
    genders: {
        MALE: "Male",
        FEMALE: "Female",
        TRANSGENDER: "Transgender",
    },
    defaultStatus: {
        ACTIVE: "active",
        INACTIVE: "inactive",
        UNAPPROVED: "unapproved",
        APPROVED: "approved",
        REJECTED: "rejected",
        DELETED: "deleted",
        PENDING: "pending",
        INPROCESS: "in-process",
        COMPLETED: "completed",
    },
};
const capitalize = phrase => {
    if (phrase) {
        return phrase
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    return "";
};
const generateURl = filePath => {
    return filePath ? process.env.CDN_WEB_STATIC + "/" + filePath : null;
}
const generateResponse = (code, payload, type, noWrapPayload) => {
    noWrapPayload = noWrapPayload || false;
    type = type || "unknown";

    if (code && code >= 300) {
        payload = _.isArray(payload) ? payload : [payload];
        var plain_text_errors = payload.length > 0 && _.isString(payload[0]) ? payload : [];
        var object_errors = payload.length > 0 && _.isObject(payload[0]) ? payload : [];
        var output = {
            error: {
                errors: plain_text_errors,
                error_params: object_errors,
                code: code,
                type: type,
            },
        };
        return output;
    } else {
        // success data
        if (payload && !noWrapPayload) {
            return {result: payload};
        } else if (payload) {
            return payload;
        } else {
            return undefined;
        }
    }
};
module.exports = {
    OPTIONS,
    generateURl,
    generateResponse,
    capitalize,
};
