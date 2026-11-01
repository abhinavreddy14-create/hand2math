import React, { useMemo } from 'react';
import { renderLatexToHtml } from '../utils/mathFormat';

interface MathViewProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    return renderLatexToHtml(math, displayMode);
  }, [math, displayMode]);

  return (
    <span
      className={`inline-block font-serif tracking-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
