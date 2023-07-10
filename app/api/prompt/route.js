import Prompt from "@models/prompt"
import { connectToDB } from "@utils/db"

export const GET = async (req, res) => {
    try {
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.error(`Error GetPrompt: ${error}`)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}