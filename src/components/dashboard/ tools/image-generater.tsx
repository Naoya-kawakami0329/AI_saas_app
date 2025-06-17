'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateImage } from "@/app/actions/generate-image";
import { GenerateImageState } from "@/types/actions";
import React from "react";
import { useActionState } from "react";
import { Download } from "lucide-react";

const initialState: GenerateImageState = {
    imageURL: undefined,
    error: undefined,
    status: 'idle',
    keyword: undefined,
}

const ImageGenerater = () => {
    const [state,formAction] = useActionState(generateImage,initialState)
    return (
        <div className="space-y-6">
           <div className="space-y-4">
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="キーワード" className="text-sm font-medium text-gray-700">
                        キーワード
                    </Label>
                    <Input
                        id="keyword"
                        name="keyword"
                        placeholder="作成したい画像のキーワードを入力してください(例: 海、犬、猫、花、etc...)"
                        required
                    />
                </div>
                <Button type="submit">画像を生成する</Button>
            </form>
           </div>
           {/* 画像生成結果 */}
           {state.imageURL && (
           <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-slate-50">
                <div className="aspect-video relative">
                    <img src={state.imageURL} alt="Generated Image" className="w-full h-full object-cover" />
                </div>
            </div>
            <Button>
                <Download className="mr-2"/>
                ダウンロード
            </Button>
           </div>
           )}
        </div>
    )
}

export default ImageGenerater;