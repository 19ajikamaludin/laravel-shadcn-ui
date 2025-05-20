import { router } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service here
        console.error('Error caught by Error Boundary:', error, errorInfo)
    }

    handleBack() {
        this.setState({ hasError: false, error: null })
        router.visit(route('dashboard'))
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div
                    style={{
                        color: 'red',
                        padding: '20px',
                        backgroundColor: '#ffe6e6',
                    }}
                    className="flex flex-row gap-2"
                    onClick={() => this.handleBack()}
                >
                    <div className="flex flex-row items-center gap-2">
                        <ArrowLeft />
                        Kembali
                    </div>
                    <div className="border-l-2 pl-2 border-red-400">
                        <h1>Something went wrong:</h1>
                        <pre>{this.state.error?.toString()}</pre>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
