"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, FileDown } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FileUploader } from "@/components/common/FileUploader";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/loading";
import FormError from "@/components/ui/form-error";

type OfferData = {
  id: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  letterUrl: string;
  candidateId: string;
  status: string;
};

export default function OfferPage({ params }: { params: { token: string } }) {
  const [signedFile, setSignedFile] = useState<{
    name: string;
    type: string;
    base64: string;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const sendSignedOffer = useCreateMutation({
    endpoint: "/api/offers/signed",
    successMessage: "Signed offer uploaded successfully",
    refetchKey: "offer",
    onSuccess: () => {
      setSignedFile(null);
      setError("");
    },
  });

  const {
    data: offer,
    isLoading,
    error: queryError,
  } = useQuery<OfferData>({
    queryKey: ["offer", params.token],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/offers/verify?token=${params.token}`
      );
      return res.data.data;
    },
    enabled: !!params.token,
  });

  if (isLoading || !params.token) return <Loading />;

  if (queryError) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Alert variant="destructive">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>{getErrorMessage(queryError)}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!signedFile) return;
    setUploading(true);
    await sendSignedOffer(
      {
        signedFile,
        candidateFullName: offer?.candidateName,
        offerId: offer?.id,
        candidateId: offer?.candidateId,
      },
      setError
    );
    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-card border rounded-xl shadow p-6 space-y-3">
        <h2 className="text-2xl font-semibold">Job Offer</h2>
        <p>
          Hi <strong>{offer?.candidateName}</strong>,
        </p>
        <p>
          We’re excited to offer you the position of{" "}
          <strong>{offer?.jobTitle}</strong> at{" "}
          <strong>{offer?.companyName}</strong>.
        </p>
        <p>
          You can view and download your offer letter using the button below:
        </p>

        <a href={offer?.letterUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="default" className="mt-4">
            <FileDown className="mr-2 h-4 w-4" />
            Download Offer Letter
          </Button>
        </a>
      </div>

      {offer?.status !== "pending" ? (
        <div>
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Offer Status</AlertTitle>
            <AlertDescription>
              This offer has already been processed.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold">Upload Signed Offer Letter</h3>
          <FileUploader
            value={signedFile}
            onChange={setSignedFile}
            accept={{
              "application/pdf": [".pdf"],
            }}
            label="Upload Signed Letter (PDF)"
          />

          {error && <FormError message={error} />}

          <Button
            disabled={!signedFile || uploading}
            onClick={handleUpload}
            className="mt-2"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload Signed Letter"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
