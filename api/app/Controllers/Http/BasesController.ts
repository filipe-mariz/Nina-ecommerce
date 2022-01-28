export default class BasesController {
    handleResponse(data: object) {
        return data
    }

    handleExeption(message: string) {
        return {
            skip: true,
            type: message
        }
    }

    handleError({ response }) {
        return response.status(400).json({
            message: 'Some unexpected error happened'
        })
    }
}
