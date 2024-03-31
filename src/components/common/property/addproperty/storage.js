import { storage } from "../../../../firebase";

export async function uploadMediaAsync(uri, filePath) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = storage.ref(filePath);
    await storageRef.put(blob);
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (error) {
    throw new Error(`Error uploading media: ${error.message}`);
  }
}

export async function deleteMediaAsync(filePath) {
  try {
    const storageRef = storage.ref(filePath);
    await storageRef.delete();
    console.log("Media deleted successfully");
  } catch (error) {
    throw new Error(`Error deleting media: ${error.message}`);
  }
}
