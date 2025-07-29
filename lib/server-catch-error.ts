import { NextResponse as response } from "next/server"

const serverCatchError = (error: unknown, status: number = 500) => {
    if(error instanceof Error) {
        return response.json({message: error.message}, {status})
    }
    return response.json({message: "Internal server error"}, {status})
} 

export default serverCatchError