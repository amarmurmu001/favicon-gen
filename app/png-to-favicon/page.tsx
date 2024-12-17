"use client";
import { useRef, useState, useEffect } from "react";

const PngToFavicon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null); // For undo
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [scale, setScale] = useState(1); // For zoom in/out
  const [rotation, setRotation] = useState(0); // For rotation
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState({ width: 128, height: 128 }); // Default crop area

  // Redraw the canvas with transformations when any parameter changes
  useEffect(() => {
    const applyTransformations = () => {
      const canvas = canvasRef.current;
      if (canvas && image) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Reset canvas size to match crop dimensions
          canvas.width = cropSize.width;
          canvas.height = cropSize.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.save();

          // Apply transformations: scale, rotation, and cropping
          ctx.translate(cropSize.width / 2, cropSize.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.scale(scale, scale);

          ctx.drawImage(
            image,
            cropStart.x,
            cropStart.y,
            cropSize.width / scale,
            cropSize.height / scale,
            -cropSize.width / 2,
            -cropSize.height / 2,
            cropSize.width,
            cropSize.height
          );
          ctx.restore();

          // Automatically generate previews for all sizes
          generatePreviews(canvas);
        }
      }
    };

    const generatePreviews = (canvas: HTMLCanvasElement) => {
      const sizes = [16, 32, 64, 128]; // Different favicon sizes
      const generatedPreviews = sizes
        .map((size) => {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = size;
          tempCanvas.height = size;
          const tempCtx = tempCanvas.getContext("2d");

          if (tempCtx) {
            tempCtx.drawImage(canvas, 0, 0, size, size);
            return { size, url: tempCanvas.toDataURL("image/x-icon") };
          }
          return null;
        })
        .filter(Boolean) as { size: number; url: string }[];

      setPreviews(generatedPreviews);
    };

    if (image) applyTransformations();
  }, [image, scale, rotation, cropStart, cropSize]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          setOriginalImage(img); // Save the original image for undo
          setImage(img); // Display the original image initially
          setCropSize({ width: img.width, height: img.height }); // Set crop size to match original
          setCropStart({ x: 0, y: 0 }); // Start crop from top-left
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const undoChanges = () => {
    if (originalImage) {
      setImage(originalImage); // Restore the original image
      setScale(1);
      setRotation(0);
      setCropStart({ x: 0, y: 0 });
      setCropSize({ width: originalImage.width, height: originalImage.height }); // Reset to original size
    }
  };

  const downloadFavicon = (url: string, size: number) => {
    const link = document.createElement("a");
    link.download = `favicon-${size}x${size}.ico`;
    link.href = url;
    link.click();
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-base-100 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">PNG to Favicon Generator</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center">
            <input
              type="file"
              accept="image/png"
              onChange={handleFileUpload}
              className="file-input file-input-bordered w-full max-w-sm"
            />
            {image && (
              <div className="mt-4 flex flex-col items-center">
                <canvas ref={canvasRef} className="border w-full max-w-md" />
                <div className="mt-4 flex gap-2 flex-wrap justify-center">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
                  >
                    Zoom Out
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setScale((prev) => Math.min(2, prev + 0.1))}
                  >
                    Zoom In
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setRotation((prev) => prev - 15)}
                  >
                    Rotate Left
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setRotation((prev) => prev + 15)}
                  >
                    Rotate Right
                  </button>
                  <button className="btn btn-sm btn-warning" onClick={undoChanges}>
                    Undo
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1">
            {previews.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">Generated Favicons</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {previews.map(({ size, url }) => (
                    <div key={size} className="text-center">
                      <h4 className="text-sm">{size}x{size}</h4>
                      <img
                        src={url}
                        alt={`Favicon ${size}x${size}`}
                        className="border rounded-md mx-auto"
                      />
                      <button
                        className="btn btn-sm btn-secondary mt-2"
                        onClick={() => downloadFavicon(url, size)}
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PngToFavicon;
