
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const createCompositeImage = (
    originalImageSrc: string,
    targetWidth: number,
    targetHeight: number
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return reject(new Error('Could not get canvas context'));
        }

        // Fill background with a neutral color to guide the AI
        ctx.fillStyle = '#111827'; // Corresponds to gray-900
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            // Calculate dimensions to fit the original image within the target canvas
            const hRatio = targetWidth / img.width;
            const vRatio = targetHeight / img.height;
            const ratio = Math.min(hRatio, vRatio) * 0.9; // Use 90% of available space to ensure borders
            
            const newWidth = img.width * ratio;
            const newHeight = img.height * ratio;

            const x = (targetWidth - newWidth) / 2;
            const y = (targetHeight - newHeight) / 2;

            ctx.drawImage(img, x, y, newWidth, newHeight);

            // Get base64 string, remove data URL prefix
            const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
            resolve(base64Image);
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = originalImageSrc;
    });
};
