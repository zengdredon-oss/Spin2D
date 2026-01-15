import React, { useState, useCallback, useRef, useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  formatValue?: (value: number) => string;
  label?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatValue = (v) => v.toString(),
  label,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<'min' | 'max' | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = thumb;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((percentage / 100) * (max - min) + min);
    const steppedValue = Math.round(newValue / step) * step;

    setLocalValue((prev) => {
      if (isDragging.current === 'min') {
        const newMin = Math.min(steppedValue, prev[1] - step);
        return [Math.max(min, newMin), prev[1]];
      } else {
        const newMax = Math.max(steppedValue, prev[0] + step);
        return [prev[0], Math.min(max, newMax)];
      }
    });
  }, [min, max, step]);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      onChange(localValue);
    }
    isDragging.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [localValue, onChange, handleMouseMove]);

  const minPercent = getPercentage(localValue[0]);
  const maxPercent = getPercentage(localValue[1]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{label}</span>
          <span className="text-sm font-medium text-gray-800">
            {formatValue(localValue[0])} - {formatValue(localValue[1])}
          </span>
        </div>
      )}
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute w-full h-1 bg-gray-200 rounded-full"
        >
          {/* Active track */}
          <div
            className="absolute h-full bg-primary-500 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        {/* Min thumb */}
        <div
          className="absolute w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-md cursor-pointer transform -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown('min')}
        />

        {/* Max thumb */}
        <div
          className="absolute w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-md cursor-pointer transform -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
