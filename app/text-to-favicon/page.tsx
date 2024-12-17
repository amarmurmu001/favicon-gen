"use client"
import { useRef, useState } from "react";

const TextToFavicon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("");
  const [font, setFont] = useState("Roboto");
  const [preview, setPreview] = useState<string | null>(null);

  const generateFavicon = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `48px ${font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

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
        <h2 className="card-title">Text to Favicon</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter Text</span>
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Favicon Text"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Font</span>
          </label>
          <select
            className="select select-bordered"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            <option>Roboto</option>
            <option>Lato</option>
            <option>Open Sans</option>
          </select>
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

export default TextToFavicon;
