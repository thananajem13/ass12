import { Router } from "express";
import * as category from'./controller/category.js'
import { endPoint } from "./category.endPoint.js";
import { myMulter,fileValidation } from "../../services/multer.js";
import * as validators from './category.validation.js'
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
const router = Router()




router.post('/',auth(endPoint.add),
validation(validators.createCategory),
myMulter(fileValidation.image).single('image'),
category.createCategory )

router.put('/:id',auth(endPoint.update),validation(validators.updateCategory),myMulter(fileValidation.image).single('image'),category.updateCategory )
router.get('/',validation(validators.getCategories) ,category.getAllCategories )
router.get('/:id',validation(validators.getCategory), category.getCategory )




export default router