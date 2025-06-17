'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RemoveBackgroundState } from "@/types/actions";
import React from "react";
import { useActionState } from "react";
import { Download, Layers2 } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../loading-spinner";
import { toast } from "@/hooks/use-toast";
import { removeBackground } from "@/app/actions/remove-background";


const initialState: RemoveBackgroundState = { 
    status: 'idle',
}

const BackgroundRemover= () => {
    const [state,formAction,pending] = useActionState(removeBackground,initialState)

    const handleDownload = () => {
        if (!state.processedImage) {return}
        try {
           const base64Image = state.processedImage?.split(',')[1]
          const blob=new Blob([Buffer.from(base64Image, 'base64')],{type: 'image/png'})
           const url=window.URL.createObjectURL(blob)
           const link=document.createElement('a')
           link.href=url
           link.download=`${state.processedImage}.png`
           document.body.appendChild(link)
           link.click()
           toast({
            title: 'ダウンロードに成功しました',
            description: '画像をダウンロードしました',
           })
           document.body.removeChild(link)
           window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error(error);
            toast({
                title: 'ダウンロードに失敗しました',
                description: '再度試してください',
                variant: 'destructive',
            })
        }
    }

    return (
        <div className="space-y-6">
           <div className="space-y-4">
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="image">
                        ファイルをアップロード
                    </Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="w-full"
                        required
                    />
                </div>
                <Button 
                type="submit"
                 disabled={pending} 
                 className={cn("w-full duration-300", pending && "bg-primary/80")}>
                    {pending ? <LoadingSpinner/> : <Layers2 className="mr-2"/>}
                   背景を削除
                </Button>
            </form>
           </div>
           {/* 画像生成結果 */}
           {state.processedImage && (
           <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-slate-50">
                <div className="aspect-video relative">
                    <img src={state.processedImage} alt="Generated Image" className="w-full h-full object-cover" />
                </div>
            </div>
            <Button className="w-full" variant={"outline"} onClick={handleDownload}>
                <Download className="mr-2"/>
                ダウンロード
            </Button>
           </div>
           )}
        </div>
    )
}

export default BackgroundRemover;