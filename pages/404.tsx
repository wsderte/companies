import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    })

    return (
        <div className="not-found">
            <h1>Something went wrong</h1>
        </div>
    )
}

export default NotFound
