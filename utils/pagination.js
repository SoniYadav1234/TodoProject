let trim = (x) => {
    let value = String(x);
    return value.replace(/^\s+|\s+$/gm, '');
}

const isEmpty = (value) => {
    if (value === null || value === undefined || trim(value) === '' || value.length === 0 || Object.entries(value).length === 0) {
        return true;
    } else {
        return false;
    }
}

// pagination function 
let paginationWithFromTo = ( fromParameter, toParameter) => {
    let from = isEmpty(fromParameter) ? 1 : fromParameter;
    let to = isEmpty(toParameter) ? 10 : toParameter;
    let pageSize = Number((to - from) + 1);
    let offset = Number(from - 1);
    return { offset, pageSize};
}

module.exports = {
    paginationWithFromTo: paginationWithFromTo
}