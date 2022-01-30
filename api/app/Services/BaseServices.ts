export default class HandleServices {
    async handleExeption(code: String) {
        return {
            skip: true,
            code: code
        }
    }
}
