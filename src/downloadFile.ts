// NOTE: Opens the file in new tab to download then via browser utils.
// No ability to download & save file in some browsers due to issues (UL-10493).
export const downloadFile = (
  fileName?: string,
  fileContent?: BlobPart,
  fileUrl?: string,
  _options?: BlobPropertyBag,
) => {
  // NOTE: 'fileContent' is not used due to issues covered in UL-10493

  if (!fileName || !fileContent || !fileUrl) return;

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.target = '_blank';
  link.style.display = 'none';
  link.click();
  link.remove();
};
