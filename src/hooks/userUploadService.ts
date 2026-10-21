import { getSignedURL } from "@/lib/action/urlAction";
import { checkUserLimits } from "@/lib/action/chatActions";
import { UPLOAD_ERRORS } from "@/constants/errors_useUpload";

export async function verifyUserLimitsService() {
  try {
    const res = await checkUserLimits();
    return {
      canUpload: res.canUpload,
      reason: res.reason || UPLOAD_ERRORS.DEFAULT_LIMIT_REASON,
    };
  } catch (err) {
    throw new Error(UPLOAD_ERRORS.VERIFY_LIMITS_FAILED);
  }
}

export async function getSignedUrlService(file: File) {
  const result = await getSignedURL({
    name: file.name,
    type: file.type,
    size: file.size,
  });

  if (!result.success) {
    throw new Error(result.failure || UPLOAD_ERRORS.SIGNED_URL_FAILED);
  }

  return result.success;
}

export function uploadToS3Service(url: string, file: File, onProgress: (percent: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(UPLOAD_ERRORS.S3_UPLOAD_FAILED(xhr.status)));
      }
    };

    xhr.onerror = () => reject(new Error(UPLOAD_ERRORS.NETWORK_ERROR));
    xhr.send(file);
  });
}

export async function processPdfService(fileId: string) {
  const res = await fetch("/api/process-pdf", {
    method: "POST",
    body: JSON.stringify({ fileId }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 429) {
    return { success: false, limitReached: true, error: data.error || UPLOAD_ERRORS.LIMIT_REACHED };
  }

  if (!res.ok) {
    throw new Error(data.error || UPLOAD_ERRORS.PROCESS_FAILED);
  }

  return { success: true, limitReached: false };
}