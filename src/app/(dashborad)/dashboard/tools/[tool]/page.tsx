import { tools, ToolType } from "@/config/tools"
import { notFound } from "next/navigation"

interface PageProps {
    params: {
        tool: string
    }
}

const ToolPage = async ({ params }: PageProps) => {
    const toolType = params.tool as ToolType
    const tool = tools[toolType]

    if (!tool) {
        notFound()
    }
    
    return (
        <div>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <tool.component />
        </div>
    )
}

export default ToolPage;