import React from 'react';

function DownloadButton({ content, fileName, fileType }) {
  const handleDownload = () => {
    fileName = fileName.split('/').pop().split('.')[0];
    if (typeof content === 'string' /*&& (content.startsWith('http://') || content.startsWith('https://'))*/) {
      // Fetch the content if it is a URL
      fetch(content)
        .then(response => {
          if (!response.ok) {
            throw new Error('La respuesta no es correcta');
          }
          return response.blob();
        })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
        .catch(error => console.error('Error al descargar el archivo:', error));
    } else {
      const blob = new Blob([content], { type: fileType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const soloNombreArchivo =  fileName.split('/').pop().split('.')[0];
      link.download = soloNombreArchivo;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  };

  return (
    <button onClick={handleDownload}>Descargar</button>
  );
}

export default DownloadButton;
