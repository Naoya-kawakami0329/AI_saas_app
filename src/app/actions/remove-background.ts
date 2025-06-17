'use server'

import { RemoveBackgroundState } from '@/types/actions';

export async function removeBackground(state: RemoveBackgroundState, formData: globalThis.FormData): Promise<RemoveBackgroundState> {
    const imageURL = formData.get('image') as string;
    if (!imageURL) {
        return {
            status: 'error',
            error: '画像ファイルをアップロードしてください'
        }
    }
    


    const response = await fetch(
        `${process.env.BASE_URL}/api/remove-background`,
        {
            method: 'POST',
            body:formData
        }
    );

    if (!response.ok) {
       throw new Error("画像の背景削除に失敗しました");
    }

    const data = await response.json();

    return {  
        status: 'success',
        processedImage: data.imageURL,
    }
    
} 