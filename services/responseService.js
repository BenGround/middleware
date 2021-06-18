const createResponse = (res, result, data, message) => {
    let status = result ? 200 : 500;

    return res.status(status).json({
        result: result,
        data: data,
        message: message
    })
}

const createErrorResponse = (res, error) => {
    return res.status('400').json({
        result: 'error',
        message: error
    })
}

module.exports = { createResponse, createErrorResponse }
