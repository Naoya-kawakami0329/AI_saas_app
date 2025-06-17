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

        // 画像のメタデータを確認
        const metadata = await sharp(buffer).metadata();
        if (!metadata.format) {
            return NextResponse.json({ error: 'サポートされていない画像フォーマットです' }, { status: 400 });
        }

        // 画像を圧縮
        const optimizedInput = await sharp(buffer)
            .resize(1280, 720, { fit: 'inside' })
            .toFormat('png')
            .toBuffer();

        // 新しいFormDataを作成
        const apiFormData = new FormData();
        const blob = new Blob([optimizedInput], { type: 'image/png' });
        apiFormData.append('image', blob, 'image.png');

        const response = await axios.post(
            `https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
            apiFormData,
            {
                headers: { 
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                    'Content-Type': 'multipart/form-data'
                }
            },
        );

        if (response.status !== 200) {
            throw new Error(`${response.status}: ${JSON.stringify(response.data)}`);
        }


        // 画像データを取得
        const imageData = response.data.image;
        if (!imageData) {
            throw new Error('画像データが見つかりません');
        }

        // Base64データをバッファに変換
        const imageBuffer = Buffer.from(imageData, 'base64');

        // 画像を最適化
        const optimizedImage = await sharp(imageBuffer)
            .resize(1280, 720, { fit: 'inside' })
            .toFormat('png')
            .toBuffer();

        // 圧縮した画像をBase64形式に変換
        const base64Image = optimizedImage.toString('base64');
        const imageURL = `data:image/png;base64,${base64Image}`;

        return NextResponse.json({ imageURL });
    } catch (error) {
        console.error('Background removal error:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `画像の背景削除に失敗しました: ${error.message}` }, 
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "画像の背景削除に失敗しました" }, 
            { status: 500 }
        );
    }
}