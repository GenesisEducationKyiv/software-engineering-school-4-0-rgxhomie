export interface IRateProvider {
    getRate(): Promise<number>
}