"use client";

import { useRef, useState, useEffect } from "react";
import WebFont from "webfontloader";

const TextToFavicon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("F");
  const [font, setFont] = useState("Roboto");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [preview, setPreview] = useState<string | null>(null);
  const [fonts, setFonts] = useState<string[]>(["Roboto", "Lato", "Open Sans"]); // Initial font list
  const [isFontLoaded, setIsFontLoaded] = useState(true);

  useEffect(() => {
    // Fetch Google Fonts dynamically
    fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDNc73rnbqLvFTq4sfU1i6vt0qCNOga8DA"
    )
      .then((response) => response.json())
      .then((data) => {
        const fontList = data.items.map((item: any) => item.family);
        setFonts(fontList);
      })
      .catch((error) => console.error("Error fetching Google Fonts:", error));
  }, []);

  useEffect(() => {
    setIsFontLoaded(false);
    WebFont.load({
      google: {
        families: [font]
      },
      active: () => {
        setIsFontLoaded(true);
      }
    });
  }, [font]);

  useEffect(() => {
    if (isFontLoaded) {
      generateFavicon();
    }
  }, [text, font, fontSize, textColor, bgColor, isFontLoaded]);

  const generateFavicon = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Set canvas size
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw text
        ctx.font = `${fontSize}px ${font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = textColor;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // Update the preview
        setPreview(canvas.toDataURL("image/x-icon"));
      }
    }
  };

  const downloadFavicon = (format: string) => {
    if (preview) {
      const link = document.createElement("a");
      link.download = `favicon.${format}`;
      if (format === "ico") {
        link.href = preview;
      } else {
        link.href = canvasRef.current!.toDataURL(`image/${format}`);
      }
      link.click();
    }
  };

  return (
    <div className="card w-full max-w-lg bg-base-100 shadow-xl mx-auto mt-10">
      <div className="card-body">
        <h2 className="card-title text-center">🎨 Text to Favicon Generator</h2>

        {/* Text Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter Text</span>
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Favicon Text"
            className="input input-bordered"
          />
        </div>

        {/* Font Selector */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Font</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            {fonts.map((fontName) => (
              <option key={fontName} value={fontName}>
                {fontName}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Font Size</span>
          </label>
          <input
            type="range"
            min="24"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="range"
          />
          <div className="text-center mt-2">{fontSize}px</div>
        </div>

        {/* Color Pickers */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Text Color</span>
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="input input-bordered h-12 w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Background Color</span>
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="input input-bordered h-12 w-full"
          />
        </div>

        {/* Preview Section */}
        {preview && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Preview</h3>
            <div className="flex justify-center">
              <img src={preview} alt="Favicon Preview" className="w-16 h-16 border" />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary"
            onClick={() => downloadFavicon("ico")}
          >
            Download as ICO
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => downloadFavicon("png")}
          >
            Download as PNG
          </button>
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} width={64} height={64} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default TextToFavicon;

