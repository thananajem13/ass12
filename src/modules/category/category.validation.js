import joi from "joi";

export const updateCategory = {
    params:joi.object().required().keys({
        id:joi.string().required().trim().min(24).max(24).messages({

        })
    }),
    body: joi.object().keys({
        name:joi.string().allow('').messages({

        })
    }),
    file:joi.object().keys({
        image:joi.string().allow('').messages({

        })
    }),
    headers:joi.object().required().keys({
        authorization:joi.string().required().messages({
            "string.empty":"fill authorization filed, shouldn't be empty",
            "string.base":"authorization must be a string",
            "any.required":"authorization is required"
        })}).options({ allowUnknown: true })


}
export const createCategory = {
     
    body: joi.object().required().keys({
        name:joi.string().required().messages({

        }), 
    }),
    file:joi.object().required().keys({
        image:joi.string().required().messages({

        })
    }),
    headers:joi.object().required().keys({
        authorization:joi.string().required().messages({
            "string.empty":"fill authorization filed, shouldn't be empty",
            "string.base":"authorization must be a string",
            "any.required":"authorization is required"
        })}).options({ allowUnknown: true })


}
export const getCategory = {
    params:joi.object().required().keys({
        id:joi.string().required().trim().min(24).max(24).messages({

        })
    }), 

}
export const getCategories = {
    query:joi.object().keys({
        page:joi.number().positive().messages({

        }),
        size:joi.number().positive().max(50).messages({

        }),
    }), 

}