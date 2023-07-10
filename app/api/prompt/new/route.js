import Prompt from "@models/prompt"
import { connectToDB } from "@utils/db"

export const POST = async (req, res) => {
    const { userID, prompt, tag } = await req.json()

    try {
        await connectToDB()
        const newPrompt = new Prompt({ creator: userID, prompt, tag })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.error(`Error @PromptRoute: ${error}`)
        return new Response('Failed to create new prompt', { status: 500 })
    }
}