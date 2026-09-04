// Utility to manage user-uploaded photo locally with persistence and live sync

const PHOTO_STORAGE_KEY = 'portfolio_custom_profile_photo';
const PHOTO_UPDATED_EVENT = 'portfolio_photo_updated';

export function getCustomPhoto(): string | null {
  try {
    return localStorage.getItem(PHOTO_STORAGE_KEY);
  } catch (err) {
    console.error('Error reading photo from localStorage', err);
    return null;
  }
}

export function saveCustomPhoto(base64Data: string): void {
  try {
    localStorage.setItem(PHOTO_STORAGE_KEY, base64Data);
    window.dispatchEvent(new CustomEvent(PHOTO_UPDATED_EVENT, { detail: base64Data }));
  } catch (err) {
    console.error('Error saving photo to localStorage', err);
  }
}

export function removeCustomPhoto(): void {
  try {
    localStorage.removeItem(PHOTO_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PHOTO_UPDATED_EVENT, { detail: null }));
  } catch (err) {
    console.error('Error removing photo from localStorage', err);
  }
}

export function subscribeToPhotoUpdates(callback: (photoUrl: string | null) => void): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<string | null>;
    callback(customEvent.detail);
  };

  window.addEventListener(PHOTO_UPDATED_EVENT, handler);
  return () => {
    window.removeEventListener(PHOTO_UPDATED_EVENT, handler);
  };
}
