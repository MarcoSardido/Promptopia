"use client"

import Form from "@components/Form"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptID = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({ prompt: '', tag: '' })

    useEffect(() => {
      const getPromptInfo = async () => {
        const response = await fetch(`/api/prompt/${promptID}`)
        const data = await response.json()

        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
      }

      if (promptID) getPromptInfo()
    }, [promptID])
    

    const EditPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${promptID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/profile')
            }
        } catch (error) {
            console.error(`Error @EditPrompt: ${error}`)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form type='Update'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={EditPrompt}
        />
    )
}

export default EditPrompt