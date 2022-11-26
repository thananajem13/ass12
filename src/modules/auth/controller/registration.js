import userModel from '../../../../DB/model/User.model.js'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../../../services/email.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../../../services/errorHandling.js'
import { findOne, findOneAndUpdate } from '../../../../DB/DBMethods.js'
export const signup = asyncHandler(
    async (req, res, next) => {


        const { email, password, userName } = req.body;
        const user = await findOne({ model: userModel, filter: { email }, select: 'email' })
        if (user) {
            next(Error('Email Exist', { cause: 409 }))

        } else {
            const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
            const newUser = new userModel({ userName, password: hash, email });
            const token = jwt.sign({ id: newUser._id }, process.env.emailToken, { expiresIn: "1h" })
            const rfToken = jwt.sign({ id: newUser._id }, process.env.emailToken)
            const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
            const rfLink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${rfToken}`
            const message = `
        <a href="${link}">confirmEmail</a>
        <br>
        <a href="${rfLink}">re-confirmEmail</a>

        `
            const info = await sendEmail(email, 'Confirm Email', message)

            if (info.accepted.length) {
                const savedUser = await newUser.save()
                return res.status(201).json({ message: "Done", savedUserID: savedUser._id })
            } else {
                next(Error('rejected email', { cause: 404 }))
            }


        }



    }
)

export const signin = asyncHandler(
    async (req, res, next) => {

        const { email, password } = req.body;
        const user = await findOne({ model: userModel, filter: { email } })
        if (!user) {
            next(Error('Email not Exist', { cause: 409 }))
        } else {
            const match = bcrypt.compareSync(password, user.password)
            if (!user.confirmEmail) {
                next(Error('email not confirmed', { cause: 400 }))

            } else {
                if (user.blocked) {
                    next(Error('account blocked', { cause: 400 }))

                } else {
                    if (!match) {
                        next(Error('In-valid password', { cause: 400 }))

                    } else {
                        console.log({tokenSignature:process.env.tokenSignature});
                        const token = jwt.sign(
                            { id: user._id }
                            , process.env.tokenSignature,
                             { expiresIn: 60 * 60 * 24 })
                        const rfToken = jwt.sign(
                            { id: user._id }
                            , process.env.tokenSignature)
console.log({tokenInLogin:token});
                        return res.status(200).json({ message: "Done", accessToken: token, rfToken })
                    }
                }
            }

        }



    }
)

export const confirmEmail = asyncHandler(
    async (req, res, next) => {

        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.emailToken)
        if (!decoded.id) {
            next(Error('invalid payload', { cause: 404 }))

        } else {
            const user = await findOneAndUpdate({ model: userModel, 
                filter: { _id: decoded.id, confirmEmail: false }, 
                data: { confirmEmail: true }, 
                options: { new: true } },
                )
            return res.status(200).redirect(process.env.FEURL)

        }



    }
)
