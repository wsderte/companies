export interface IApiData {
    filter(arg0: (data: any) => boolean): IApiData
    company: string
    game: string
    cost: number
    currency: string
    createDate: string
    payDate: string | null
    id: number
}

// export type FetchReturn = { fetchData: (base: string) => Promise<IApiData> }
