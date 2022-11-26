import { roles } from "../../middleware/auth.js";

export const endPoint = {
    add:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User],

}