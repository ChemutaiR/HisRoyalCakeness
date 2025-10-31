"use client";

import { useState, useRef } from 'react';

export function useDecorationImage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return {
    imageFile,
    fileInputRef,
    setImageFile,
  };
}

