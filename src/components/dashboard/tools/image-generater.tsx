'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateImage } from "@/app/actions/generate-image";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const ImageGenerater = () => {
    const searchParams = useSearchParams();
    const imageUrl = searchParams.get('image');

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <form action={generateImage} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                            キーワード
                        </Label>
                        <Input
                            id="prompt"
                            name="prompt"
                            placeholder="作成したい画像のキーワードを入力してください(例: 海、犬、猫、花、etc...)"
                            required
                        />
                    </div>
                    <Button type="submit">
                        画像を生成する
                    </Button>
                </form>
            </div>

            {imageUrl && (
                <div className="mt-4">
                    <div className="relative aspect-square w-full max-w-2xl mx-auto">
                        <Image
                            src={imageUrl}
                            alt="生成された画像"
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGenerater; 