import {
  StorageReference,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

export default async function firebaseUpload(
  ref: StorageReference,
  file: File | Blob
) {
  const snapshot = await uploadBytes(ref, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
