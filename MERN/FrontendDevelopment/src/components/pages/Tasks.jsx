import { useEffect, useMemo, useState } from 'react'
import Button from '../common/Button'
import Card from '../common/Card'
import { useLocalStorage } from '../hooks/useLocalStorage'

const filters = ['All', 'Active', 'Completed']

export default function Tasks() {
    const [tasks, setTasks] = useLocalStorage('tasks', [])
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        // Example side-effect: could hydrate from remote or analytics
    }, [])

    const filteredTasks = useMemo(() => {
        if (filter === 'Active') return tasks.filter(t => !t.completed)
        if (filter === 'Completed') return tasks.filter(t => t.completed)
        return tasks
    }, [tasks, filter])

    const addTask = () => {
        const trimmed = text.trim()
        if (!trimmed) return
        setTasks(prev => [...prev, { id: crypto.randomUUID(), text: trimmed, completed: false }])
        setText('')
    }
    const toggleTask = id => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    const deleteTask = id => setTasks(prev => prev.filter(t => t.id !== id))

    return (
        <div className="space-y-6">
            <Card title="Add Task">
                <div className="flex gap-2">
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="flex-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                        placeholder="What needs doing?"
                    />
                    <Button onClick={addTask}>Add</Button>
                </div>
            </Card>

            <Card title="Filters">
                <div className="flex gap-2">
                    {filters.map(f => (
                        <Button
                            key={f}
                            variant={filter === f ? 'primary' : 'secondary'}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </Button>
                    ))}
                </div>
            </Card>

            <Card title="Tasks">
                <ul className="space-y-2">
                    {filteredTasks.map(t => (
                        <li key={t.id} className="flex items-center justify-between rounded border border-gray-200 dark:border-gray-700 p-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
                                <span className={t.completed ? 'line-through text-gray-500' : ''}>{t.text}</span>
                            </label>
                            <Button variant="danger" onClick={() => deleteTask(t.id)}>Delete</Button>
                        </li>
                    ))}
                    {filteredTasks.length === 0 && <p className="text-gray-500">No tasks to show.</p>}
                </ul>
            </Card>
        </div>
    )
}
