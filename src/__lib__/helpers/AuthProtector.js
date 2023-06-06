const cookie = require('cookie')

export function ownerAuth(gssp) {
    return async (context) => {
        const { req, res } = context
        if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie)
            if (!cookies._owner) {
                return {
                    redirect: {
                        destination: '/a/login',
                    }
                }
            }

        } else {
            return {
                redirect: {
                    destination: '/a/login',

                }
            }
        }
        return await gssp(context)
    }
}

export function __Ad(gssp) {
    return async (context) => {
        const { req, res } = context
        if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie)
            if (!cookies.__MT__) {
                return {
                    redirect: {
                        destination: '/login',

                    }
                }
            }

        } else {
            return {
                redirect: {
                    destination: '/login',

                }
            }
        }
        return await gssp(context)
    }
}