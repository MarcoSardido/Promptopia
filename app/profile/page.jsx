"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [myPost, setMyPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()

            setMyPosts(data)
        }
        if (session?.user.id) fetchPost()
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const confirmDelete = confirm("Are you sure you want to delete this prompt?")

        if (confirmDelete) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter(findPost => findPost._id !== post._id)
                setMyPosts(filteredPosts)
            } catch (error) {
                console.error(`Error @handleDelete: ${error}`)
            }
        }
    }
    return (
        <Profile
            name={session?.user.name}
            desc="Welcome to your personal profile. Here you can see all your prompts and customize it."
            data={myPost}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile