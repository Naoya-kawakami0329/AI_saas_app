import ImageGenerater from "@/components/dashboard/ tools/image-generater";
import BackgroundRemover from "@/components/dashboard/ tools/background-remove";
export const tools = {
    "image-generator": {
        title: "画像生成",
        description: "AIを使用してお好みの画像を生成してみよう",
        component: ImageGenerater,
    },
    "remove-bg": {
        title: "画像生成",
        description: "画像の背景を削除してみよう",
        component: BackgroundRemover,
    },
    "optimize": {
        title: "画像最適化",
        description: "画像を最適化してみよう",
        component: ImageGenerater,
    }
}

export type ToolType = keyof typeof tools