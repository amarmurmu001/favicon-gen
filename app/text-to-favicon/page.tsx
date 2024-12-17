"use client";

import { useRef, useState, useEffect } from "react";
import WebFont from "webfontloader";
import { Gradient } from "../../components/Gradient";


const AdvancedTextToFavicon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("F");
  const [font, setFont] = useState("Roboto");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [gradientStart, setGradientStart] = useState("#ffffff");
  const [gradientEnd, setGradientEnd] = useState("#000000");
  const [useGradient, setUseGradient] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fonts, setFonts] = useState<string[]>(["Roboto", "Lato", "Open Sans"]);
  const [isFontLoaded, setIsFontLoaded] = useState(true);
  const [shape, setShape] = useState<"square" | "circle">("square");
  const [textShadow, setTextShadow] = useState(false);
  const [textStroke, setTextStroke] = useState(false);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDNc73rnbqLvFTq4sfU1i6vt0qCNOga8DA"
    )
      .then((response) => response.json())
      .then((data: { items: { family: string }[] }) => {
        const fontList = data.items.map((item) => item.family);
        setFonts(fontList);
      })
      .catch((error) => console.error("Error fetching fonts:", error));
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
  }, [text, font, fontSize, textColor, bgColor, gradientStart, gradientEnd, useGradient, shape, textShadow, textStroke, isFontLoaded]);

  const generateFavicon = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (useGradient) {
          const gradient = Gradient(gradientStart, gradientEnd);
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = bgColor;
        }

        if (shape === "circle") {
          ctx.beginPath();
          ctx.arc(32, 32, 32, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, 64, 64);
        }

        ctx.font = `${fontSize}px ${font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = textColor;

        // Reset shadow and stroke settings
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.lineWidth = 0;

        if (textShadow) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
        }

        if (textStroke) {
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.strokeText(text, 32, 32);
        }

        ctx.fillText(text, 32, 32);

        setPreview(canvas.toDataURL("image/png"));
      }
    }
  };

  const downloadFavicon = (format: string) => {
    if (preview) {
      const link = document.createElement("a");
      link.download = `favicon.${format}`;
      link.href = canvasRef.current!.toDataURL(`image/${format}`);
      link.click();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4">
          <h2 className="card-title text-center text-xl font-bold mb-4">Text to Favicon Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text">Text</span>
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter Favicon Text"
                  className="input input-bordered input-sm"
                />
              </div>

              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text">Font</span>
                </label>
                <select
                  className="select select-bordered select-sm w-full"
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

              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text">Font Size: {fontSize}px</span>
                </label>
                <input
                  type="range"
                  min="24"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="range range-sm"
                />
              </div>

              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text">Text Color</span>
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="input input-bordered h-8 w-full p-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="form-control">
                <label className="label py-0 cursor-pointer">
                  <span className="label-text">Use Gradient</span>
                  <input
                    type="checkbox"
                    checked={useGradient}
                    onChange={(e) => setUseGradient(e.target.checked)}
                    className="toggle toggle-primary toggle-sm"
                  />
                </label>
              </div>

              {useGradient ? (
                <>
                  <div className="form-control">
                    <label className="label py-0">
                      <span className="label-text">Gradient Start</span>
                    </label>
                    <input
                      type="color"
                      value={gradientStart}
                      onChange={(e) => setGradientStart(e.target.value)}
                      className="input input-bordered h-8 w-full p-0"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label py-0">
                      <span className="label-text">Gradient End</span>
                    </label>
                    <input
                      type="color"
                      value={gradientEnd}
                      onChange={(e) => setGradientEnd(e.target.value)}
                      className="input input-bordered h-8 w-full p-0"
                    />
                  </div>
                </>
              ) : (
                <div className="form-control">
                  <label className="label py-0">
                    <span className="label-text">Background</span>
                  </label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="input input-bordered h-8 w-full p-0"
                  />
                </div>
              )}

              <div className="form-control">
                <label className="label py-0">
                  <span className="label-text">Shape</span>
                </label>
                <select
                  className="select select-bordered select-sm w-full"
                  value={shape}
                  onChange={(e) => setShape(e.target.value as "square" | "circle")}
                >
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <div className="form-control flex-1">
                  <label className="label py-0 cursor-pointer">
                    <span className="label-text">Shadow</span>
                    <input
                      type="checkbox"
                      checked={textShadow}
                      onChange={(e) => setTextShadow(e.target.checked)}
                      className="toggle toggle-primary toggle-sm"
                    />
                  </label>
                </div>

                <div className="form-control flex-1">
                  <label className="label py-0 cursor-pointer">
                    <span className="label-text">Stroke</span>
                    <input
                      type="checkbox"
                      checked={textStroke}
                      onChange={(e) => setTextStroke(e.target.checked)}
                      className="toggle toggle-primary toggle-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Preview</h3>
              <div className="flex justify-center items-center space-x-4">
                <img src={preview} alt="Favicon Preview" className="w-8 h-8 border" />
                <img src={preview} alt="Favicon Preview" className="w-16 h-16 border" />
                <img src={preview} alt="Favicon Preview" className="w-32 h-32 border" />
              </div>
            </div>
          )}

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => downloadFavicon("ico")}
            >
              Download ICO
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => downloadFavicon("png")}
            >
              Download PNG
            </button>
          </div>

          <canvas ref={canvasRef} width={64} height={64} className="hidden"></canvas>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTextToFavicon;

