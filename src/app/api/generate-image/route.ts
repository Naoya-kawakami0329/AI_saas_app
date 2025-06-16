import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: NextRequest) {
    const { keyword } = await req.json();
    console.log(keyword);
    try {
        const payload = {
            prompt: keyword,
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

        console.log(response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "画像の生成に失敗しました" }, 
            { status: 500 }
        );
    }
}