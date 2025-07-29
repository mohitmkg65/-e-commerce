import { message } from "antd"
import { isAxiosError } from "axios"

const clientCatchError = (error: unknown) => {
    // Error from server side
    if(isAxiosError(error))
        message.error(error.response?.data.message)
    
    // Error from client side
    if(error instanceof Error)
        message.error(error.message)
}

export default clientCatchError