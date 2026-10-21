import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ExtendedUploadState } from "@/types/upload";
import { MAX_FILE_SIZE_MB, ALLOWED_FILE_TYPE } from "@/constants/upload";
import { UPLOAD_ERRORS, UPLOAD_SUCCESS } from "@/constants/errors_useUpload";
import { 
  verifyUserLimitsService, 
  getSignedUrlService, 
  uploadToS3Service, 
  processPdfService 
} from "@/hooks/userUploadService";

export const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<ExtendedUploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [limitReason, setLimitReason] = useState("");
  const [isCheckingLimits, setIsCheckingLimits] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function verifyLimits() {
      try {
        const { canUpload, reason } = await verifyUserLimitsService();
        if (!canUpload) {
          setIsLimitReached(true);
          setLimitReason(reason);
        }
      } catch (err) {
        console.error("Failed to verify limits:", err);
      } finally {
        setIsCheckingLimits(false);
      }
    }
    verifyLimits();
  }, []);

  const handleFile = (selected?: File) => {
    if (isLimitReached) {
      toast.error(`Upload blocked: ${limitReason}`);
      return;
    }
    if (!selected) return;

    if (selected.type !== ALLOWED_FILE_TYPE) {
      toast.error(UPLOAD_ERRORS.INVALID_FILE_TYPE);
      return;
    }

    const fileSizeMB = selected.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error(UPLOAD_ERRORS.FILE_TOO_LARGE(MAX_FILE_SIZE_MB));
      return;
    }

    setFile(selected);
    uploadFile(selected);
  };

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploadState("uploading");
      setShowProgressBar(false);
      setUploadProgress(0);
      setTimeout(() => setShowProgressBar(true), 600);

      const { url, fileId } = await getSignedUrlService(fileToUpload);

      await uploadToS3Service(url, fileToUpload, (percent) => {
        setUploadProgress(percent);
      });

      setUploadState("preparing");

      const processResult = await processPdfService(fileId);

      if (!processResult.success) {
        if (processResult.limitReached) {
          setIsLimitReached(true);
          setLimitReason(processResult.error);
        }
        setUploadState("error");
        toast.error(processResult.error);
        return;
      }

      setUploadState("success");
      toast.success(UPLOAD_SUCCESS.UPLOAD_COMPLETE);

      setTimeout(() => {
        router.push(`/chat/${fileId}`);
      }, 1000);
    } catch (error: any) {
      console.error(error);
      setUploadState("error");

      if (error.message === UPLOAD_ERRORS.LIMIT_REACHED) {
        setIsLimitReached(true);
      }

      toast.error(error.message || UPLOAD_ERRORS.DEFAULT_UPLOAD_FAILED);
    }
  };

  const refetchLimits = async () => {
    try {
      const { canUpload, reason } = await verifyUserLimitsService();
      setIsLimitReached(!canUpload);
      setLimitReason(reason);
    } catch (err) {
      console.error("Failed to refetch limits:", err);
    }
  };

  return {
    file,
    uploadState,
    uploadProgress,
    showProgressBar,
    isLimitReached,
    limitReason,
    isCheckingLimits,
    handleFile,
    refetchLimits
  };
};