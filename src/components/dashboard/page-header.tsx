
interface PageHeaderProps {
    title: string
    description?: string
    children?: React.ReactNode
}

const PageHeader = ({title, description,children}:PageHeaderProps) => {
    return (
        <div>
            <div className="flex items-center justify-between space-y-2">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {title}
                    </h1>
                {description && (
                    <p className="text-gray-500">
                        {description}
                    </p>
                )}
                </div>
                {children}
            </div>
        </div>
    )
}

export default PageHeader;