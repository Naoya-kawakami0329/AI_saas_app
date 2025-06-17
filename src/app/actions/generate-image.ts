'use server'

import { GenerateImageState } from '@/types/actions';

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
            keyword
            })
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`${response.status}: ${error}`);
    }

    const data = await response.json();

    return {  
        status: 'success',
        imageURL: data.imageURL,
        keyword: keyword,
    }
} 