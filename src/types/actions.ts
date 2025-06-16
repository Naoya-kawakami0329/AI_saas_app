export type GenerateImageState = {
    imageURL?: string;
    error?: string;
    status?: 'idle' | 'loading' | 'success' | 'error';
    keyword?: string;
}