export const GetDate: () => string = () => {
    let date: Date = new Date()

    date.setHours(date.getHours() + 2)

    const createDate: string =
        new Date().toLocaleDateString() +
        ':' +
        date.toISOString().split('T')[1].substr(0, 8)

    return createDate
}
