import joi from 'joi'
export const signup = {
    body: joi.object().required().keys({
        userName: joi.string().min(2).max(20).required().messages({
            'any.required': "username filed is required",
            'any.empty': "empty username is not acceptable"
        }),
        email: joi.string().email().required().messages({
        }),
        password: joi.string().pattern(new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|]).{8,32}/)).required().messages({
        }),
        cPassword: joi.string().valid(joi.ref('password')).required().messages({
        }),
    })
}
export const signin = {
    body: joi.object().required().keys({

        email: joi.string().email().required().messages({
        }),
        password: joi.string().pattern(new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|]).{8,32}/)).required().messages({
        }),

    })
}
export const confirmEmail = {
    params: joi.object().required().keys({

        token: joi.string().min(10).required().messages({
        }), 

    })
}