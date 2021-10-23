export const isAllEqual = (list, field="value") => {
    return list.every(i => 
        i[field] === list[0][field]
    )
};