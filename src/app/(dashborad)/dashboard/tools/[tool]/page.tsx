import { tools, ToolType } from "@/config/tools"
import { notFound } from "next/navigation"


export default async function ToolPage({ params }:{params: Promise<{tool: string}>}) {
    const toolType = (await params).tool as ToolType
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