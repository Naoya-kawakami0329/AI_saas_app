'use server'

import { GenerateImageState } from '@/types/actions';
import { redirect } from 'next/navigation';

export async function generateImage(state: GenerateImageState, formData: globalThis.FormData): Promise<GenerateImageState> {
    const keyword = formData.get('keyword') as string;
    const apiKey = process.env.STABILITY_API_KEY;

    const response = await fetch(
        `${process.env.BASE_URL}/api/generate-image`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
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
            })
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`${response.status}: ${error}`);
    }

    const data = await response.json();
    
    // 生成された画像のBase64データを取得
    const imageData = data.artifacts[0].base64;
    return {
        imageURL: `data:image/png;base64,${imageData}`,
        status: 'success',
        keyword: keyword,
    }
} 