export async function fileToBase64(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

export function getMimeType(file: File): string {
  const validTypes: Record<string, string> = {
    "application/pdf": "application/pdf",
    "image/jpeg": "image/jpeg",
    "image/jpg": "image/jpeg",
    "image/png": "image/png",
    "image/webp": "image/webp",
  };
  return validTypes[file.type] || "image/jpeg";
}

export function validateFile(file: File): string | null {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Type non supporté. Utilisez PDF, JPG ou PNG.";
  }

  if (file.size > 10 * 1024 * 1024) {
    return "Fichier trop volumineux. Maximum 10 Mo.";
  }

  return null;
}