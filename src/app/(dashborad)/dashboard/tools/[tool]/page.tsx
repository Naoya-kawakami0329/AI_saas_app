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
    
    const ToolComponent = tool.component


    return (
        <div>
            <PageContainer>
                <PageHeader title={tool.title} description={tool.description} />
                <div className="max-w-2xl">
                    <ToolComponent />
                </div>
            </PageContainer>
        </div>
    )
}

export default ToolPage;