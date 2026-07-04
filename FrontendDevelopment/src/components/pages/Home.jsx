import Card from '../common/Card'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="space-y-6">
            <Card title="Welcome">
                <p className="mb-4">This app demonstrates component architecture, hooks, and API integration with Tailwind styling.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Link to="/tasks"><Button>Go to Tasks</Button></Link>
                    <Link to="/api"><Button variant="secondary">Explore API</Button></Link>
                </div>
            </Card>

            <Card title="Responsive grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="rounded bg-white dark:bg-gray-800 p-4 shadow transition hover:shadow-md">
                            <p>Card {i + 1}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
