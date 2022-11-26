import { roles } from "../../middleware/auth.js";

export const endPoint = {
    profile:[roles.Admin,roles.User]
}