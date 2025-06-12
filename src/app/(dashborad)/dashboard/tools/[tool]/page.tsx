import PageContainer from "@/components/dashboard/page-container"
import PageHeader from "@/components/dashboard/page-header"
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
            <PageContainer>
                <PageHeader title={tool.title} description={tool.description} />
                <tool.component />
            </PageContainer>
        </div>
    )
}

export default ToolPage;