export interface IJobTitle {
    id?: number | null,
    name: string,
    code: string
}

export interface IJobPosition extends IJobTitle {
    titleId: number,
    titleName?: string
}