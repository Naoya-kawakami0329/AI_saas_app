import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const File = formData.get('image') as File;

        if (!File) {
            return NextResponse.json({ error: '画像ファイルをアップロードしてください' }, { status: 400 });
        }

        const bytes = await File.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 新しいFormDataを作成
        const apiFormData = new FormData();
        const blob = new Blob([buffer], { type: 'image/png' });
        apiFormData.append('image', blob, 'image.png');

        const response = await axios.post(
            `https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
            apiFormData,
            {
                headers: { 
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'arraybuffer'
            },
        );

        if (response.status !== 200) {
            throw new Error(`${response.status}: ${response.data.toString()}`);
        }

        // 画像を圧縮
        const optimizedImage = await sharp(response.data)
            .resize(1280, 720) 
            .png({ 
                quality: 80, 
                compressionLevel: 9,
            })
            .toBuffer();

        // 圧縮した画像をBase64形式に変換
        const base64Image = optimizedImage.toString('base64');
        const imageURL = `data:image/png;base64,${base64Image}`;

        return NextResponse.json({ imageURL });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "画像の背景削除に失敗しました" }, 
            { status: 500 }
        );
    }
}