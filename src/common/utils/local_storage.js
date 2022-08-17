export const removeAllLocalStorageItems = () =>{
    const items = ['params', 'books', 'scroll']
    items.forEach(item=> localStorage.removeItem(item))
}