import { tools, ToolType } from "@/config/tools"
import { notFound } from "next/navigation"

interface PageProps {
    params: {
        tool: string
    }
}

export default async function ToolPage({ params }: PageProps) {
    const toolType = await Promise.resolve(params.tool) as ToolType
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