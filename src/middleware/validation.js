

const dataMethod = ['body', 'params', 'query', 'headers','file']


export const validation = (Schema) => {
    return (req, res, next) => {
        try {
            const validationArr = []
            dataMethod.forEach(key => {
                if (Schema[key]) {
                    console.log({reeeeeeq:req[key]});
                    const validationResult = Schema[key].validate(req[key], { abortEarly: false }) 
                    if (validationResult?.error) {
                        validationArr.push(validationResult.error.details)
                    }
                }
            })
            if (validationArr.length) { 
            next(new Error(JSON.stringify(validationArr) ,{cause:500})) 
             


                // return res.status(400).json({ message: "validation error", validationArr })
            } else {
                next()
            }
        } catch (error) {
            next(new Error('validation err',{cause:500})) 

        }

    }

}