import React, { useMemo } from 'react';

interface DocumentHeaderProps {
  htmlContent: string;
  serverName: string | undefined;
}

const DocumentHeader = ({ htmlContent, serverName }: DocumentHeaderProps) => {
  const processedHtml = useMemo(() => {
    if (!htmlContent) return '';

    const finalServerName = serverName || '[Servidor não selecionado]';
    const date = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return htmlContent
      .replace('{{SERVER_NAME}}', finalServerName)
      .replace('{{DATE}}', date);
  }, [htmlContent, serverName]);

  return (
    <>
      <div className="document-header" dangerouslySetInnerHTML={{ __html: processedHtml }} />
      <style>{`
        .document-header p {
            margin: 0;
            padding: 0;
        }
        .document-header hr {
            border-top: 1px solid #9ca3af;
            margin: 1rem 0;
        }
        .dark .document-header hr {
            border-top-color: #4b5563;
        }
      `}</style>
    </>
  );
};

export default DocumentHeader;
