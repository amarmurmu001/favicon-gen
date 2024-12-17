"use client"
import { useRef, useState } from "react";

const EmojiToFavicon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [emoji, setEmoji] = useState("😀");
  const [preview, setPreview] = useState<string | null>(null);

  const generateFavicon = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "48px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

        // Update the preview
        setPreview(canvas.toDataURL("image/x-icon"));
      }
    }
  };

  const downloadFavicon = () => {
    if (preview) {
      const link = document.createElement("a");
      link.download = "favicon.ico";
      link.href = preview;
      link.click();
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">Emoji to Favicon</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter Emoji</span>
          </label>
          <input
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="Enter an emoji (e.g., 😀)"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <button className="btn btn-primary mt-4" onClick={generateFavicon}>
            Generate Preview
          </button>
        </div>
        {preview && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Preview</h3>
            <img src={preview} alt="Favicon Preview" className="w-16 h-16" />
            <button className="btn btn-secondary mt-4" onClick={downloadFavicon}>
              Download Favicon
            </button>
          </div>
        )}
        <canvas ref={canvasRef} width={64} height={64} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default EmojiToFavicon;
