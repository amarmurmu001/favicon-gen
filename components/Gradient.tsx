export function Gradient(startColor: string, endColor: string): CanvasGradient {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
  
    const gradient = ctx.createLinearGradient(0, 0, 64, 64);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
  
    return gradient;
  }
  
  