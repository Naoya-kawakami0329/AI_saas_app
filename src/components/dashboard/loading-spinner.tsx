import { Loader2 } from "lucide-react"

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin mr-2"/>
            <span className="ml-2">生成中...</span>
        </div>
    )
}

export default LoadingSpinner