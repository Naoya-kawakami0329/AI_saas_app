'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateImage } from "@/app/actions/generate-image";
import { useFormState } from "react-dom";
import { GenerateImageState } from "@/types/actions";
import Image from "next/image";

const initialState: GenerateImageState = {
    imageURL: null,
    status: 'idle',
    keyword: null
};

const ImageGenerater = () => {
    const [state, formAction] = useFormState(generateImage, initialState);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="keyword" className="text-sm font-medium text-gray-700">
                            キーワード
                        </Label>
                        <Input
                            id="keyword"
                            name="keyword"
                            placeholder="作成したい画像のキーワードを入力してください(例: 海、犬、猫、花、etc...)"
                            required
                        />
                    </div>
                    <Button type="submit">
                        画像を生成する
                    </Button>
                </form>
            </div>

            {state.imageURL && (
                <div className="mt-4">
                    <div className="relative aspect-square w-full max-w-2xl mx-auto">
                        <Image
                            src={state.imageURL}
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