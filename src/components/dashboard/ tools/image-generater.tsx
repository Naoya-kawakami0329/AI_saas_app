import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ImageGenerater = () => {
    return (
        <div className="space-y-6">
           <div className="space-y-4">
            <form action="" className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="キーワード" className="text-sm font-medium text-gray-700">
                        キーワード
                    </Label>
                    <Input
                        id="prompt"
                        name="prompt"
                        placeholder="作成したい画像のキーワードを入力してください(例: 海、犬、猫、花、etc...)"
                        required
                    />
                </div>
                <Button>画像を生成する</Button>
            </form>
           </div>
        </div>
    )
}

export default ImageGenerater;