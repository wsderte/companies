export interface IApiData {
    company: string
    game: string
    cost: number
    currency: string
    createDate: string
    payDate: string | null
}

// export type FetchReturn = { fetchData: (base: string) => Promise<IApiData> }
