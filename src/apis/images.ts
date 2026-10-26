import { fetchWithAuth } from "./fetchWithAuth";

// presigned URL을 발급받아 S3에 직접 업로드한 뒤, 다른 API에서 쓸 URL을 반환
export async function uploadImage(file: File): Promise<string> {
  const response = await fetchWithAuth("/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name }),
  });
  if (!response.ok) throw new Error("이미지 업로드 URL을 받지 못했습니다.");

  const { uploadUrl, url }: { uploadUrl: string; url: string } =
    await response.json();

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!uploadResponse.ok) throw new Error("이미지를 업로드하지 못했습니다.");

  return url;
}
