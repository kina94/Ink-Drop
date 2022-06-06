const LocalStorage = {
    removeAllItems: () => {
        const items = ['params', 'books', 'scroll']
        items.map(item=> localStorage.removeItem(item))
    }
}

export default LocalStorage


