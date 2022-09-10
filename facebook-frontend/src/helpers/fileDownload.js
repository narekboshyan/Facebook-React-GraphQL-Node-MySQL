const onDownload = async (downloadUrl, name) => {
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = name;
  link.click();
};

export default onDownload;
