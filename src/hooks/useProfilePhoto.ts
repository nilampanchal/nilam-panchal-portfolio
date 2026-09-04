import { useState, useEffect, useCallback } from 'react';
import { getCustomPhoto, saveCustomPhoto, removeCustomPhoto, subscribeToPhotoUpdates } from '../utils/photoStorage';

export function useProfilePhoto(defaultPath: string = '/profile.jpg') {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    const saved = getCustomPhoto();
    return saved || defaultPath;
  });

  const [hasCustomPhoto, setHasCustomPhoto] = useState<boolean>(() => {
    return !!getCustomPhoto();
  });

  useEffect(() => {
    const unsubscribe = subscribeToPhotoUpdates((updated) => {
      if (updated) {
        setPhotoUrl(updated);
        setHasCustomPhoto(true);
      } else {
        setPhotoUrl(defaultPath);
        setHasCustomPhoto(false);
      }
    });

    return unsubscribe;
  }, [defaultPath]);

  const uploadPhoto = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file (JPEG, PNG, WebP, etc.).'));
        return;
      }

      // Max 10MB
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Image size should be less than 10MB.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        saveCustomPhoto(result);
        resolve(result);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file.'));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const resetPhoto = useCallback(() => {
    removeCustomPhoto();
  }, []);

  return {
    photoUrl,
    hasCustomPhoto,
    uploadPhoto,
    resetPhoto,
  };
}
