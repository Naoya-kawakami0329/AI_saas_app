import { tools } from "@/config/tools"

const ToolPage = () => {

    const tool=tools[ "image-generater"]
        
    
    return (
        <div>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <tool.component />
            </div>
        )
    
}

export default ToolPage;