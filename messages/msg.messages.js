module.exports = {
    success: {
        s0: {
            code: "Created",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "Updated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "Found",
            type: "success"
        },
        s3: {
            http: 200,
            code: "Deleted",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "NotFound",
            type: "error"
        }
    }
}