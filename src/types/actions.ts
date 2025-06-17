export type GenerateImageState = {
    imageURL?: string;
    error?: string;
    status: 'idle' | 'loading' | 'success' | 'error';
    keyword?: string;
}

export type RemoveBackgroundState = {
    originalImage?: string;
    processedImage?: string;
    error?: string;
    status?: 'idle' | 'success' | 'error';
}
