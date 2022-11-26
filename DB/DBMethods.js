//find
export const find = async ({ model, filter = {},skip=0,limit=10, select = "", populate = [] } = {}) => {
    const result = await model.find (filter).select(select).skip(skip).limit(limit).populate(populate)
    return result
}

export const findOne = async ({ model, filter = {}, select = "", populate = [] } = {}) => {
    const result = await model.findOne(filter).select(select).populate(populate)
    return result
}

export const findById = async ({ model, filter = {}, select = "", populate = [] } = {}) => {
    const result = await model.findById(filter).select(select).populate(populate)
    return result
}

//update
export const findOneAndUpdate = async ({ model, filter = {}, data = {}, select = '', populate = [], options = {} } = {}) => {
    const result = await model.findOneAndUpdate(filter, data, options).select(select).populate(populate)
    return result
}

export const findByIdAndUpdate = async ({ model, filter = {}, data = {}, select = '', populate = [], options = {} } = {}) => {
    const result = await model.findByIdAndUpdate(filter, data, options).select(select).populate(populate)
    return result
}

export const updateOne = async ({ model, filter = {}, data = {}  } = {}) => {
    const result = await model.updateOne(filter, data) 
    return result
}

 
//delete

export const findOneAndDelete = async ({ model, filter = {}, data = {}, select = '', populate = [],   } = {}) => {
    const result = await model.findOneAndDelete(filter).select(select).populate(populate)
    return result
}

export const findByIdAndDelete  = async ({ model, filter = {}, data = {}, select = '', populate = []  } = {}) => {
    const result = await model.findByIdAndDelete(filter).select(select).populate(populate)
    return result
}
export const deleteOne = async ({ model, filter = {},   } = {}) => {
    const result = await model.deleteOne(filter) 
    return result
}

//create
export const create = async ({ model,  data = {}   } = {}) => {
    const result = await model.create( data) 
    console.log({result,data});
    return result
}

export const createAndSave  = async ({ model,   data = {} } = {}) => {
    const newObj = new model (data)
    const savedObj = await newObj.save()
     
    return savedObj
}

export const insertMany = async ({ model,  data = [{}]  } = {}) => {
    const result = await model.insertMany( data) 
    return result
}
