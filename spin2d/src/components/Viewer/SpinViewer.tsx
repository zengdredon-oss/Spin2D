import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiRotateCcw, FiRotateCw, FiEye, FiEyeOff, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import { Apartment } from '../../types';
import { allApartments } from '../../data/apartments';
import { statusColors, hoverHighlight, selectedHighlight, hexToRgb, colorsMatch } from '../../utils/colors';
import { Button } from '../Common';

interface SpinViewerProps {
  frameCount?: number;
  onApartmentClick?: (apartment: Apartment) => void;
}

export const SpinViewer: React.FC<SpinViewerProps> = ({
  frameCount = 72,
  onApartmentClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [maskFrames, setMaskFrames] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const {
    currentFrame,
    setCurrentFrame,
    selectedApartmentId,
    setSelectedApartment,
    hoveredApartmentId,
    setHoveredApartment,
    showOverlay,
    setShowOverlay,
    isRotating,
    setIsRotating,
    isMenuCollapsed,
    getFilteredApartments,
  } = useStore();

  // Generate placeholder frames (in production, these would be actual images)
  useEffect(() => {
    const loadFrames = async () => {
      setIsLoading(true);
      const newFrames: HTMLImageElement[] = [];
      const newMaskFrames: HTMLImageElement[] = [];
      
      // For demo, we'll create colored placeholder frames
      for (let i = 0; i < frameCount; i++) {
        // Create main frame (placeholder with gradient)
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        const ctx = canvas.getContext('2d')!;
        
        // Draw building placeholder with rotation effect
        const hue = (i / frameCount) * 30 + 200; // Blue to cyan gradient
        ctx.fillStyle = `hsl(${hue}, 30%, 85%)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw building shape
        ctx.fillStyle = `hsl(${hue}, 20%, 50%)`;
        const buildingWidth = 400;
        const buildingHeight = 500;
        const offsetX = Math.sin((i / frameCount) * Math.PI * 2) * 100;
        const centerX = canvas.width / 2 + offsetX;
        ctx.fillRect(centerX - buildingWidth / 2, 150, buildingWidth, buildingHeight);
        
        // Draw windows (apartments)
        const filteredApartments = allApartments;
        filteredApartments.forEach((apt, idx) => {
          const row = Math.floor(idx / 3);
          const col = idx % 3;
          const windowX = centerX - buildingWidth / 2 + 50 + col * 120;
          const windowY = 200 + row * 80;
          
          // Set color based on status
          if (apt.status === 'available') {
            ctx.fillStyle = '#22c55e';
          } else if (apt.status === 'reserved') {
            ctx.fillStyle = '#eab308';
          } else {
            ctx.fillStyle = '#ef4444';
          }
          
          ctx.fillRect(windowX, windowY, 80, 60);
        });
        
        // Draw frame number for debugging
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = '14px Arial';
        ctx.fillText(`Frame ${i + 1}/${frameCount}`, 20, 30);
        
        const img = new Image();
        img.src = canvas.toDataURL();
        newFrames.push(img);
        
        // Create mask frame
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = 1200;
        maskCanvas.height = 800;
        const maskCtx = maskCanvas.getContext('2d')!;
        maskCtx.fillStyle = '#000000';
        maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
        
        // Draw apartment masks with unique colors
        filteredApartments.forEach((apt, idx) => {
          const row = Math.floor(idx / 3);
          const col = idx % 3;
          const windowX = centerX - buildingWidth / 2 + 50 + col * 120;
          const windowY = 200 + row * 80;
          
          maskCtx.fillStyle = apt.maskColor;
          maskCtx.fillRect(windowX, windowY, 80, 60);
        });
        
        const maskImg = new Image();
        maskImg.src = maskCanvas.toDataURL();
        newMaskFrames.push(maskImg);
        
        setLoadingProgress(((i + 1) / frameCount) * 100);
      }
      
      setFrames(newFrames);
      setMaskFrames(newMaskFrames);
      setIsLoading(false);
    };
    
    loadFrames();
  }, [frameCount]);

  // Draw current frame
  const drawFrame = useCallback(() => {
    if (!canvasRef.current || frames.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const frameIndex = Math.abs(currentFrame) % frameCount;
    const frame = frames[frameIndex];
    
    if (frame && frame.complete) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(frame, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [currentFrame, frames, frameCount]);

  // Draw overlay (highlights)
  const drawOverlay = useCallback(() => {
    if (!overlayCanvasRef.current || !showOverlay) return;
    
    const ctx = overlayCanvasRef.current.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
    
    if (isRotating) return; // Don't draw overlay while rotating
    
    const filteredApartments = getFilteredApartments();
    const frameIndex = Math.abs(currentFrame) % frameCount;
    
    // Calculate building position based on frame
    const offsetX = Math.sin((frameIndex / frameCount) * Math.PI * 2) * 100;
    const centerX = overlayCanvasRef.current.width / 2 + offsetX;
    const buildingWidth = 400;
    
    filteredApartments.forEach((apt, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const windowX = centerX - buildingWidth / 2 + 50 + col * 120;
      const windowY = 200 + row * 80;
      
      // Determine highlight color
      let highlightColor = statusColors[apt.status];
      
      if (apt.id === selectedApartmentId) {
        highlightColor = selectedHighlight;
      } else if (apt.id === hoveredApartmentId) {
        highlightColor = hoverHighlight;
      }
      
      ctx.fillStyle = highlightColor;
      ctx.fillRect(windowX, windowY, 80, 60);
      
      // Add pulse effect for selected apartment
      if (apt.id === selectedApartmentId) {
        const time = Date.now() / 1000;
        const pulse = Math.sin(time * 2) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(107, 114, 128, ${pulse * 0.3})`;
        ctx.fillRect(windowX, windowY, 80, 60);
      }
    });
  }, [showOverlay, isRotating, currentFrame, frameCount, selectedApartmentId, hoveredApartmentId, getFilteredApartments]);

  // Animation loop for pulse effect
  useEffect(() => {
    if (!selectedApartmentId || !showOverlay) return;
    
    let animationId: number;
    const animate = () => {
      drawOverlay();
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [selectedApartmentId, showOverlay, drawOverlay]);

  // Draw frames when they change
  useEffect(() => {
    drawFrame();
    drawOverlay();
  }, [drawFrame, drawOverlay]);

  // Handle mouse events for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsRotating(true);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      // Handle hover detection
      if (!maskCanvasRef.current || maskFrames.length === 0 || !showOverlay) return;
      
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const frameIndex = Math.abs(currentFrame) % frameCount;
      const maskFrame = maskFrames[frameIndex];
      
      if (!maskFrame || !maskFrame.complete) return;
      
      // Draw mask to temporary canvas to read pixel
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = maskCanvasRef.current.width;
      tempCanvas.height = maskCanvasRef.current.height;
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.drawImage(maskFrame, 0, 0, tempCanvas.width, tempCanvas.height);
      
      const scaleX = tempCanvas.width / rect.width;
      const scaleY = tempCanvas.height / rect.height;
      const pixelData = tempCtx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
      
      const pixelColor = { r: pixelData[0], g: pixelData[1], b: pixelData[2] };
      
      // Find matching apartment
      let foundApartment: Apartment | null = null;
      for (const apt of allApartments) {
        const aptColor = hexToRgb(apt.maskColor);
        if (aptColor && colorsMatch(pixelColor, aptColor, 10)) {
          foundApartment = apt;
          break;
        }
      }
      
      setHoveredApartment(foundApartment?.id || null);
      return;
    }

    const deltaX = e.clientX - startX;
    const frameDelta = Math.floor(deltaX / 10); // Adjust sensitivity
    
    if (frameDelta !== 0) {
      setCurrentFrame((currentFrame + frameDelta + frameCount) % frameCount);
      setStartX(e.clientX);
    }
  }, [isDragging, startX, currentFrame, frameCount, setCurrentFrame, maskFrames, showOverlay, setHoveredApartment]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsRotating(false);
    setHoveredApartment(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!showOverlay) return;
    
    // Get clicked apartment
    if (hoveredApartmentId) {
      const apartment = allApartments.find(a => a.id === hoveredApartmentId);
      if (apartment) {
        setSelectedApartment(apartment.id);
        onApartmentClick?.(apartment);
      }
    }
  };

  // Rotate by 90 degrees (18 frames for 72 total = 90 degrees)
  const rotate90 = (direction: 'left' | 'right') => {
    const framesPer90 = Math.floor(frameCount / 4);
    const targetFrame = direction === 'right'
      ? (currentFrame + framesPer90) % frameCount
      : (currentFrame - framesPer90 + frameCount) % frameCount;
    
    // Animate rotation
    setIsRotating(true);
    const startFrame = currentFrame;
    const diff = direction === 'right' ? framesPer90 : -framesPer90;
    let progress = 0;
    
    const animate = () => {
      progress += 0.05;
      if (progress >= 1) {
        setCurrentFrame(targetFrame);
        setIsRotating(false);
        return;
      }
      
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const currentAnimFrame = Math.round(startFrame + diff * easedProgress);
      setCurrentFrame((currentAnimFrame + frameCount) % frameCount);
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gray-100 overflow-hidden"
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-50">
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-200"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">Loading frames... {Math.round(loadingProgress)}%</p>
        </div>
      )}

      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        className="absolute inset-0 w-full h-full object-contain"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* Mask canvas (hidden, for hit detection) */}
      <canvas
        ref={maskCanvasRef}
        width={1200}
        height={800}
        className="hidden"
      />

      {/* Overlay canvas (highlights) */}
      <canvas
        ref={overlayCanvasRef}
        width={1200}
        height={800}
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none ${
          showOverlay && !isRotating ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
      />

      {/* Navigation button - Back to main view */}
      <button
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
      >
        <FiChevronLeft className="text-gray-600" />
        <span className="text-sm text-gray-700">Main view</span>
      </button>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <Button
          variant="secondary"
          size="md"
          onClick={() => rotate90('left')}
          className="rounded-full shadow-lg bg-white hover:bg-gray-50"
        >
          <FiRotateCcw className="mr-2" />
          <span className="hidden sm:inline">90°</span>
        </Button>
        
        <div className="px-4 py-2 bg-white rounded-full shadow-lg text-sm text-gray-600">
          360° View
        </div>
        
        <Button
          variant="secondary"
          size="md"
          onClick={() => rotate90('right')}
          className="rounded-full shadow-lg bg-white hover:bg-gray-50"
        >
          <span className="hidden sm:inline">90°</span>
          <FiRotateCw className="ml-2" />
        </Button>
      </div>

      {/* Toggle overlay button */}
      <Button
        variant="secondary"
        size="md"
        onClick={() => setShowOverlay(!showOverlay)}
        className="absolute top-4 right-4 rounded-full shadow-lg bg-white hover:bg-gray-50"
      >
        {showOverlay ? <FiEye size={20} /> : <FiEyeOff size={20} />}
      </Button>

      {/* Compass indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 text-xs text-gray-500">
        <span>E</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${i === 4 ? 'bg-gray-700' : 'bg-gray-300'}`} />
          ))}
        </div>
        <span className="font-bold">S</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full bg-gray-300`} />
          ))}
        </div>
        <span>W</span>
      </div>

      {/* Building indicator (when hovering) */}
      {hoveredApartmentId && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary-500 text-white rounded-lg text-sm shadow-lg">
          {allApartments.find(a => a.id === hoveredApartmentId)?.index}
        </div>
      )}

      {/* Night mode toggle */}
      <div className="absolute top-4 right-16 flex items-center gap-2">
        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SpinViewer;
