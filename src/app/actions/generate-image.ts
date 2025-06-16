'use server'

import axios from "axios";
import { redirect } from 'next/navigation';

export async function generateImage(formData: globalThis.FormData): Promise<void> {
    const keyword = formData.get('keyword') as string;
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) {
        throw new Error('STABILITY_API_KEY is not set');
    }

    const response = await axios.post(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
        {
            text_prompts: [
                {
                    text: keyword,
                    weight: 1
                }
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            samples: 1,
            steps: 30,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        }
    );

    if (response.status !== 200) {
        console.error('API Response:', response.status, response.data);
        throw new Error(`${response.status}: ${JSON.stringify(response.data)}`);
    }

    // 生成された画像のBase64データを取得
    const imageData = response.data.artifacts[0].base64;
    
    // 画像データをURLパラメータとしてリダイレクト
    redirect(`/dashboard/tools/image-generator?image=${encodeURIComponent(`data:image/png;base64,${imageData}`)}`);
} 