export const GetDate: () => string = () => {
    let date = new Date()

    date.setHours(date.getHours() + 2)

    let createDate =
        new Date().toLocaleDateString() +
        ':' +
        date.toISOString().split('T')[1].substr(0, 8)

    return createDate
}
