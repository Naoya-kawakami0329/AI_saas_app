import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    const { keyword } = await req.json();
    console.log(keyword);
    try {
        const payload = {
            prompt: `Create a beautiful image of ${keyword}`,
            output_format: "png"
        };

        const formData = new FormData();
        formData.append("prompt", payload.prompt);
        formData.append("output_format", payload.output_format);

        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/core`,
            formData,
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: { 
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, 
                    Accept: "image/*" 
                },
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
        const imageURL = `data:image/jpeg;base64,${base64Image}`;

        return NextResponse.json({ imageURL });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "画像の生成に失敗しました" }, 
            { status: 500 }
        );
    }
}