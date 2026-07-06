/**
 * pdf-viewer.js
 * Integrates Mozilla pdf.js to load and render PDF documents onto a canvas.
 */

const PdfViewer = {
  pdfDoc: null,
  currentPageNum: 1,
  totalPages: 0,
  currentScale: 1.5, // Crisp rendering scale

  // Load a PDF from binary data (Uint8Array or ArrayBuffer)
  async loadPdf(data) {
    try {
      // Ensure pdfjsLib is loaded
      if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF.js library is not loaded.');
      }

      // Set worker path locally
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdf.worker.min.js';

      const loadingTask = pdfjsLib.getDocument({ data: data });
      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;
      this.currentPageNum = 1;
      return this.pdfDoc;
    } catch (error) {
      console.error('Error loading PDF:', error);
      throw error;
    }
  },

  // Render a specific page to a canvas context
  async renderPage(pageNum, canvas, rotation = 0) {
    if (!this.pdfDoc) return null;
    if (pageNum < 1 || pageNum > this.totalPages) return null;

    this.currentPageNum = pageNum;
    const page = await this.pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: this.currentScale, rotation: rotation });
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const renderContext = {
      canvasContext: canvas.getContext('2d'),
      viewport: viewport
    };

    await page.render(renderContext).promise;
    return {
      width: viewport.width,
      height: viewport.height,
      pageNum: pageNum,
      totalPages: this.totalPages
    };
  },

  async nextPage(canvas) {
    if (this.currentPageNum < this.totalPages) {
      this.currentPageNum++;
      return await this.renderPage(this.currentPageNum, canvas);
    }
    return null;
  },

  async prevPage(canvas) {
    if (this.currentPageNum > 1) {
      this.currentPageNum--;
      return await this.renderPage(this.currentPageNum, canvas);
    }
    return null;
  }
};

window.PdfViewer = PdfViewer;
