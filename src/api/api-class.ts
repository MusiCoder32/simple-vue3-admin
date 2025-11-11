import req from './request'

export default class Api {
    get: Function
    del: Function
    update: Function
    add: Function
    constructor(url: string) {
        this.get = (data: object) => {
            return req.get({ url, data })
        }
        this.del = (data: object) => {
            return req.del({ url, data })
        }
        this.update = (data: object) => {
            return req.put({ url, data })
        }
        this.add = (data: object) => {
            return req.post({ url, data })
        }
    }
}
