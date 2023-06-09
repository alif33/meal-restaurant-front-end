export const toNormalizeDate = __d__ =>{
    const date = new Date(__d__)
    return date.toLocaleDateString()
}