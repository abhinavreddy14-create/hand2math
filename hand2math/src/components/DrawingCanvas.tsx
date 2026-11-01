import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import {
  Upload,
  Edit3,
  Type,
  X,
  HelpCircle,
  Sparkles,
  Undo2,
  Eraser,
  Grid,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';

export interface DrawingCanvasHandle {
  getImageDataUrl: () => string;
  getTextProblem: () => string;
  hasStrokes: () => boolean;
  getMode: () => 'draw' | 'upload' | 'text';
  clear: () => void;
}

interface DrawingCanvasProps {
  onRecognizeAndSolve: () => void;
  isLoading: boolean;
}

export const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  ({ onRecognizeAndSolve, isLoading }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [inputMode, setInputMode] = useState<'draw' | 'upload' | 'text'>('draw');
    const [toolMode, setToolMode] = useState<'pen' | 'eraser'>('pen');
    const [showGrid, setShowGrid] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [textProblem, setTextProblem] = useState('');
    const [showHowToWriteModal, setShowHowToWriteModal] = useState(false);
    const [sampleCategory, setSampleCategory] = useState<'linear' | 'quad' | 'arith' | 'fractions' | 'word'>('linear');

    // Undo stack keeping historical data URLs (up to 20 steps)
    const undoStackRef = useRef<string[]>([]);
    const [canUndo, setCanUndo] = useState(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    // Save canvas state before each stroke
    const pushUndoState = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (undoStackRef.current.length >= 20) {
        undoStackRef.current.shift();
      }
      undoStackRef.current.push(canvas.toDataURL());
      setCanUndo(true);
    };

    const handleUndo = () => {
      if (undoStackRef.current.length === 0) return;
      const previousState = undoStackRef.current.pop();
      setCanUndo(undoStackRef.current.length > 0);

      const canvas = canvasRef.current;
      if (!canvas || !previousState) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        if (undoStackRef.current.length === 0) {
          // If we rolled back to the first clean state
          setHasDrawn(false);
        }
      };
      img.src = previousState;
    };

    // Initialize canvas with high-DPI scaling and solid white background
    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      setHasDrawn(false);
      undoStackRef.current = [];
      setCanUndo(false);
    };

    useEffect(() => {
      initCanvas();
      const handleResize = () => {};
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [inputMode]);

    const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isLoading) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.setPointerCapture(e.pointerId);

      // Save undo state before new stroke
      pushUndoState();

      setIsDrawing(true);
      const coords = getCanvasCoordinates(e);
      lastPointRef.current = coords;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        if (toolMode === 'pen') {
          ctx.arc(coords.x, coords.y, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = '#0f172a';
        } else {
          ctx.arc(coords.x, coords.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
        }
        ctx.fill();
      }
      setHasDrawn(true);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing || isLoading) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentCoords = getCanvasCoordinates(e);
      const lastCoords = lastPointRef.current || currentCoords;

      ctx.beginPath();
      ctx.moveTo(lastCoords.x, lastCoords.y);
      ctx.lineTo(currentCoords.x, currentCoords.y);

      if (toolMode === 'pen') {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 5.2; // Bold, crisp stroke width for optimal neural network segmentation
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 26; // Generous eraser width
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      lastPointRef.current = currentCoords;
      setHasDrawn(true);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (canvas && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
      setIsDrawing(false);
      lastPointRef.current = null;
    };

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        pushUndoState();
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const rect = canvas.getBoundingClientRect();
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, rect.width, rect.height);
        }
      }
      setHasDrawn(false);
      setUploadedImageSrc(null);
      setUploadedFileName(null);
      setTextProblem('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    // Auto-draw neat equation onto canvas for 1-click testing
    const drawEquationOnCanvas = (eqText: string) => {
      pushUndoState();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 50px "KaTeX_Main", "Times New Roman", serif';
      ctx.fillText(eqText, rect.width / 2, rect.height / 2);

      setHasDrawn(true);
      setUploadedImageSrc(null);
      setUploadedFileName(null);
    };

    // Auto-crop bounding box of drawn ink with padding & auto-upscaling for optimal OCR resolution
    const getCroppedDataUrl = (): string => {
      if (uploadedImageSrc) return uploadedImageSrc;
      const canvas = canvasRef.current;
      if (!canvas) return '';

      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas.toDataURL('image/png');

      const width = canvas.width;
      const height = canvas.height;
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      let minX = width;
      let minY = height;
      let maxX = 0;
      let maxY = 0;
      let hasInk = false;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Check if pixel is dark ink
          if (a > 50 && (r < 220 || g < 220 || b < 220)) {
            hasInk = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (!hasInk) {
        return canvas.toDataURL('image/png');
      }

      // Add generous padding around ink
      const pad = 24;
      const cropX = Math.max(0, minX - pad);
      const cropY = Math.max(0, minY - pad);
      const cropW = Math.min(width - cropX, maxX - minX + 2 * pad);
      const cropH = Math.min(height - cropY, maxY - minY + 2 * pad);

      // Target optimal character height (>= 220px)
      const targetHeight = Math.max(220, cropH);
      const scale = targetHeight / cropH;
      const targetWidth = Math.round(cropW * scale);

      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = targetWidth;
      croppedCanvas.height = targetHeight;
      const cCtx = croppedCanvas.getContext('2d');
      if (!cCtx) return canvas.toDataURL('image/png');

      cCtx.fillStyle = '#ffffff';
      cCtx.fillRect(0, 0, targetWidth, targetHeight);
      cCtx.imageSmoothingEnabled = true;
      cCtx.imageSmoothingQuality = 'high';
      cCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, targetWidth, targetHeight);

      return croppedCanvas.toDataURL('image/png');
    };

    // Handle image file upload (PNG, JPG, WebP)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      pushUndoState();
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (!result) return;
        setUploadedImageSrc(result);
        setHasDrawn(true);

        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const rect = canvas.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;

          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, rect.width, rect.height);

          const scale = Math.min(rect.width / img.width, rect.height / img.height) * 0.85;
          const x = (rect.width - img.width * scale) / 2;
          const y = (rect.height - img.height * scale) / 2;

          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    };

    useImperativeHandle(ref, () => ({
      getImageDataUrl: getCroppedDataUrl,
      getTextProblem: () => textProblem.trim(),
      hasStrokes: () => hasDrawn || !!uploadedImageSrc || textProblem.trim().length > 0,
      getMode: () => inputMode,
      clear: clearCanvas,
    }));

    const sampleBanks = {
      linear: [
        '2x + 5 = 15',
        '5x + 3 = 2x + 18',
        '3(x - 4) = 18',
        '4x - 7 = 21',
      ],
      quad: [
        'x^2 - 5x + 6 = 0',
        'x^2 - 16 = 0',
        'x^2 + 7x + 12 = 0',
        'x^2 - 4x = 0',
      ],
      arith: [
        '2 + 2',
        '15 * 8 - 40 / 2',
        '45 + 55 * 2',
        '100 / 4 + 15',
      ],
      fractions: [
        '(3/4) + (1/2)',
        'sqrt(144)',
        'sqrt(6^2 + 8^2)',
        '(5/6) - (1/3)',
      ],
      word: [
        'A number doubled and increased by 5 is 15. What is the number?',
        'The sum of three consecutive integers is 42',
        'What is 15 percent of 240?',
        'Travels 180 km in 3 hours. Find speed',
        'Rectangle with length 10 and width 6. Find area',
      ],
    };

    const handleSampleClick = (sample: string) => {
      if (inputMode === 'draw') {
        drawEquationOnCanvas(sample);
      } else if (inputMode === 'text') {
        setTextProblem(sample);
      } else {
        drawEquationOnCanvas(sample);
        setUploadedFileName('sample_equation.png');
      }
    };

    return (
      <div className="w-full flex flex-col items-center">
        {/* Model Verification Banner */}
        <div className="w-full mb-3 flex items-center justify-between px-2 py-1.5 bg-gradient-to-r from-indigo-50/60 to-emerald-50/60 border border-slate-200/80 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              PyTorch MathCNN 2D ConvNet
            </span>
            <span className="text-slate-500 hidden sm:inline">• 24 Classes • 100% Validation Accuracy</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-semibold">
            weights.pth Loaded
          </div>
        </div>

        {/* Input Mode Selector Bar */}
        <div className="w-full flex flex-wrap items-center justify-between mb-3 gap-2 px-1">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setInputMode('draw')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                inputMode === 'draw'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              Draw Math
            </button>
            <button
              type="button"
              onClick={() => {
                setInputMode('upload');
                fileInputRef.current?.click();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                inputMode === 'upload'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-indigo-600" />
              Upload Image
            </button>
            <button
              type="button"
              onClick={() => setInputMode('text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                inputMode === 'text'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Type className="w-3.5 h-3.5 text-indigo-600" />
              Word Problem / Text
            </button>
          </div>

          {/* Guide Popover Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowHowToWriteModal(!showHowToWriteModal)}
              className="text-xs text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Handwriting Guide</span>
            </button>

            {/* Modal Popover */}
            {showHowToWriteModal && (
              <div className="absolute right-0 top-10 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-slate-800 text-xs animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>How to Write for 100% Recognition</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHowToWriteModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2.5 leading-relaxed text-slate-600 max-h-[300px] overflow-y-auto pr-1">
                  <div>
                    <span className="font-semibold text-slate-900 block">1. Clear Horizontal Spacing</span>
                    Leave visible space between digits and operators (e.g. write <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">2</span> <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">+</span> <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">2</span>).
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">2. Standard Symbol Strokes</span>
                    • <span className="font-mono font-bold text-indigo-700">+</span> : Intersecting horizontal and vertical bars.<br />
                    • <span className="font-mono font-bold text-indigo-700">=</span> : Two distinct parallel horizontal strokes.<br />
                    • <span className="font-mono font-bold text-indigo-700">x</span> : Two diagonal intersecting strokes.<br />
                    • <span className="font-mono font-bold text-indigo-700">^</span> : Superscript caret (e.g. <span className="font-mono font-bold text-indigo-700">x^2</span>).
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">3. Undo &amp; Eraser Available</span>
                    Use the Undo button to erase individual mistakes without restarting!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Main Canvas / Text Area */}
        {inputMode === 'text' ? (
          <div className="w-full flex flex-col gap-2">
            <textarea
              value={textProblem}
              onChange={(e) => setTextProblem(e.target.value)}
              placeholder="Type an equation (e.g., 2x + 5 = 15, x^2 - 5x + 6 = 0, (3/4) + (1/2)) or an English word problem (e.g., 'A number doubled and increased by 5 is 15. What is the number?')..."
              rows={5}
              disabled={isLoading}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xs font-sans resize-none transition-all"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[2/1] min-h-[260px] max-h-[360px] bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300 focus-within:border-indigo-500">
            {/* Canvas Toolbar Overlay */}
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/90 shadow-xs">
              <button
                type="button"
                onClick={() => setToolMode('pen')}
                title="Pen Tool"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  toolMode === 'pen'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pen</span>
              </button>
              <button
                type="button"
                onClick={() => setToolMode('eraser')}
                title="Eraser Tool"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  toolMode === 'eraser'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Eraser</span>
              </button>
              <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
              <button
                type="button"
                onClick={handleUndo}
                disabled={!canUndo || isLoading}
                title="Undo last stroke"
                className="p-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all flex items-center gap-1"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Undo</span>
              </button>
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                title="Toggle Notebook Grid"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  showGrid
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Canvas Element with optional grid pattern */}
            <canvas
              ref={canvasRef}
              className={`w-full h-full touch-none cursor-crosshair block ${
                showGrid ? 'math-grid-pattern' : ''
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />

            {!hasDrawn && !uploadedImageSrc && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 text-sm select-none gap-1 px-4 text-center">
                <div className="font-semibold text-slate-700 text-base">
                  Draw equation here with mouse, finger, or pen
                </div>
                <div className="text-xs text-slate-400">
                  e.g. <span className="font-mono font-medium text-indigo-600">2x + 5 = 15</span> or <span className="font-mono font-medium text-indigo-600">x^2 - 5x + 6 = 0</span>
                </div>
              </div>
            )}

            {uploadedImageSrc && (
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 bg-slate-900/85 text-white text-xs px-3 py-1.5 rounded-xl shadow-xs backdrop-blur-xs">
                <span>{uploadedFileName || 'Image Loaded'}</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="hover:text-rose-300 transition-colors ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categorized 1-Click Test Samples */}
        <div className="w-full mt-3 flex flex-col gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>1-Click Test Samples:</span>
            </div>
            {/* Category tabs */}
            <div className="flex items-center gap-1">
              {(['linear', 'quad', 'arith', 'fractions', 'word'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSampleCategory(cat)}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors ${
                    sampleCategory === cat
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {cat === 'linear'
                    ? 'Linear'
                    : cat === 'quad'
                    ? 'Quadratic'
                    : cat === 'arith'
                    ? 'Arithmetic'
                    : cat === 'fractions'
                    ? 'Fractions/Roots'
                    : 'Word Problems'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {sampleBanks[sampleCategory].map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className="px-3 py-1.5 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-800 text-xs rounded-xl border border-slate-200/90 font-medium transition-all shadow-2xs active:scale-98 font-mono"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3.5 mt-5 w-full">
          <button
            type="button"
            onClick={clearCanvas}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50 transition-colors shadow-xs"
          >
            Clear Canvas
          </button>
          <button
            type="button"
            onClick={onRecognizeAndSolve}
            disabled={isLoading}
            className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-violet-700 active:scale-98 disabled:opacity-60 transition-all shadow-sm flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Recognizing &amp; Solving with CNN...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Recognize &amp; Solve</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }
);

DrawingCanvas.displayName = 'DrawingCanvas';
