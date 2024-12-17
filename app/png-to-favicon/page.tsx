"use client";
import { useRef, useState } from "react";

const PngToFavicon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null); // For undo
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);
  const [scale, setScale] = useState(1); // For zoom in/out
  const [rotation, setRotation] = useState(0); // For rotation
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState({ width: 128, height: 128 }); // Default crop area

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          setImage(img);
          setOriginalImage(img); // Save original image for undo
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTransformations = () => {
    const canvas = canvasRef.current;
    if (canvas && image) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Apply transformations: scale, rotation, and cropping
        canvas.width = cropSize.width;
        canvas.height = cropSize.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        // Translate for rotation
        ctx.translate(cropSize.width / 2, cropSize.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale, scale);

        // Draw the cropped and transformed image
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

        // Automatically generate previews
        generatePreviews();
      }
    }
  };

  const generatePreviews = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const sizes = [16, 32, 64, 128]; // Different favicon sizes
      const generatedPreviews = sizes.map((size) => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = size;
        tempCanvas.height = size;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0, size, size);
          return { size, url: tempCanvas.toDataURL("image/x-icon") };
        }
        return null;
      }).filter(Boolean) as { size: number; url: string }[];

      setPreviews(generatedPreviews);
    }
  };

  const downloadFavicon = (url: string, size: number) => {
    const link = document.createElement("a");
    link.download = `favicon-${size}x${size}.ico`;
    link.href = url;
    link.click();
  };

  const undoChanges = () => {
    if (originalImage) {
      setImage(originalImage);
      setScale(1);
      setRotation(0);
      setCropStart({ x: 0, y: 0 });
      setCropSize({ width: 128, height: 128 });
    }
  };

  // Automatically update canvas whenever transformations change
  if (image) {
    applyTransformations();
  }

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">PNG to Favicon with Real-Time Editing</h2>
        <div className="form-control">
          <input
            type="file"
            accept="image/png"
            onChange={handleFileUpload}
            className="file-input file-input-bordered"
          />
        </div>
        {image && (
          <div className="mt-4">
            <canvas ref={canvasRef} className="border" />
            <div className="mt-4 flex gap-4">
              {/* Zoom Controls */}
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

              {/* Rotation Controls */}
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

              {/* Undo Button */}
              <button className="btn btn-sm btn-warning" onClick={undoChanges}>
                Undo
              </button>
            </div>

            <div className="mt-4">
              {/* Crop Controls */}
              <h4 className="text-sm font-bold">Crop Area</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="input input-bordered w-20"
                  placeholder="X"
                  value={cropStart.x}
                  onChange={(e) => setCropStart((prev) => ({ ...prev, x: +e.target.value }))}
                />
                <input
                  type="number"
                  className="input input-bordered w-20"
                  placeholder="Y"
                  value={cropStart.y}
                  onChange={(e) => setCropStart((prev) => ({ ...prev, y: +e.target.value }))}
                />
                <input
                  type="number"
                  className="input input-bordered w-20"
                  placeholder="Width"
                  value={cropSize.width}
                  onChange={(e) => setCropSize((prev) => ({ ...prev, width: +e.target.value }))}
                />
                <input
                  type="number"
                  className="input input-bordered w-20"
                  placeholder="Height"
                  value={cropSize.height}
                  onChange={(e) => setCropSize((prev) => ({ ...prev, height: +e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}
        {previews.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Previews in Different Sizes</h3>
            <div className="grid grid-cols-2 gap-4">
              {previews.map(({ size, url }) => (
                <div key={size} className="text-center">
                  <h4 className="text-sm font-semibold">{size}x{size}</h4>
                  <img src={url} alt={`Favicon ${size}x${size}`} className="border rounded-md mx-auto" />
                  <button
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={() => downloadFavicon(url, size)}
                  >
                    Download {size}x{size}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PngToFavicon;
