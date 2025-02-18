// Update the handleReadClick function in BookHeader.tsx
// Find this function and update it:

const handleReadClick = async () => {
  if (book.pdfUrl) {
    // For local PDFs, we can show them directly
    setShowPdfReader(true);
  } else {
    // For remote PDFs that need conversion
    setIsConverting(true);
    try {
      const convertedUrl = await pdfToEpubConverter.convert(book);
      setEpubUrl(convertedUrl);
      setShowPdfReader(true);
    } catch (error) {
      console.error('Error processing PDF:', error);
      // If conversion fails, try showing PDF directly
      setShowPdfReader(true);
    } finally {
      setIsConverting(false);
    }
  }
};