import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateImage } from "@/app/actions/generate-image";

const ImageGenerater = () => {
    return (
        <div className="space-y-6">
           <div className="space-y-4">
            <form action={generateImage} className="space-y-4">
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
        </div>
    )
}

export default ImageGenerater;