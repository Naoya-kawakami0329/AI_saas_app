import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

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
        // 画像データをBase64形式に変換
      const base64Image = Buffer.from(response.data).toString('base64');
      const imageURL = `data:image/png;base64,${base64Image}`;
        return NextResponse.json({ imageURL });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "画像の生成に失敗しました" }, 
            { status: 500 }
        );
    }
}