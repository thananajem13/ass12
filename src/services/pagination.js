

export function paginate({page=1, size=2}) {

    if (!page || page <= 0) {
        page = 1
    }

    if (!size || size <= 0 || size>50) {
        size = 2
    }

    const skip = (page - 1) * size
    return { limit: size, skip }
}

export const getPagesNoOfPagination = ({data={},size=1}={})=>{
const dataCount = data.length;
const noOfPages = Math.ceil(dataCount/size)
return noOfPages
}