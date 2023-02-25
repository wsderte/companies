export const GetDate: () => string = () => {
    let date = new Date()

    date.setHours(date.getHours() + 2)

    // getMonth start from 0
    let month = new Date().getMonth() + 1 + ''

    if (month.length === 1) month = '0' + month

    let YEMMDD =
        new Date().getDate() + '.' + month + '.' + new Date().getFullYear()

    let createDate =
        YEMMDD + ':' + date.toISOString().split('T')[1].substr(0, 8)

    // console.log(new Date().toLocaleDateString()) // regional changes from dd.mm.year to mm/dd/year
    return createDate
}
