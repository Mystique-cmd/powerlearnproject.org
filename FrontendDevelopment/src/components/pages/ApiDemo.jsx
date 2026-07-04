import { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import { fetchJSON } from '../utils/fetcher'

export default function ApiDemo() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')
    const perPage = 10
    const observerRef = useRef()

    useEffect(() => {
        const run = async () => {
            setLoading(true); setError(null)
            try {
                const json = await fetchJSON('https://jsonplaceholder.typicode.com/posts')
                setData(json)
            } catch (e) { setError(e.message) }
            finally { setLoading(false) }
        }
        run()
    }, [])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        const items = q ? data.filter(d => d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q)) : data
        const start = 0
        const end = page * perPage
        return items.slice(start, end)
    }, [data, query, page])

    // Infinite scroll: observe sentinel
    useEffect(() => {
        const sentinel = observerRef.current
        if (!sentinel) return
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) setPage(p => p + 1)
            })
        }, { rootMargin: '200px' })
        obs.observe(sentinel)
        return () => obs.disconnect()
    }, [])

    return (
        <div className="space-y-6">
            <Card title="Search">
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                    placeholder="Search posts by title or body..."
                />
            </Card>

            <Card title="Posts">
                {loading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-600">Error: {error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(post => (
                        <div key={post.id} className="rounded border border-gray-200 dark:border-gray-700 p-3">
                            <h4 className="font-semibold">{post.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{post.body}</p>
                        </div>
                    ))}
                </div>

                <div ref={observerRef} className="h-8" />
                <div className="mt-4 flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</Button>
                    <span>Page size: {page * perPage}</span>
                    <Button onClick={() => setPage(p => p + 1)}>Load more</Button>
                </div>
            </Card>
        </div>
    )
}
