/**
 * sample-pattern.js
 * Generates a high-quality, authentic-looking knitting pattern page
 * as a data URL or renders it directly to a canvas.
 * This simulates a standard A4/US Letter pattern page with written text and a lace/cable chart.
 */

const SamplePattern = {
  createMockPatternCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');

    // 1. Background (Cozy cream paper texture)
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid background watermark (very subtle)
    ctx.strokeStyle = 'rgba(218, 203, 187, 0.2)';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Cozy borders
    ctx.strokeStyle = '#D4C5B3';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.strokeStyle = '#C4B29E';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

    // 2. Title Header
    ctx.fillStyle = '#4A3B32';
    ctx.textAlign = 'center';
    
    // Playfair Display style serif fallback
    ctx.font = 'bold 32px Georgia, serif';
    ctx.fillText('Cozy Forest Leaf Scarf', canvas.width / 2, 75);

    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillStyle = '#7C6758';
    ctx.fillText('Designed by Antigravity Knitwear • Intermediate Level', canvas.width / 2, 105);

    // Decorative divider line
    ctx.beginPath();
    ctx.moveTo(100, 125);
    ctx.lineTo(canvas.width - 100, 125);
    ctx.strokeStyle = '#8E7355';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Left Column: Materials & Written Instructions
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4A3B32';
    
    // Materials Header
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText('Materials & Info', 50, 165);
    
    ctx.font = '14px "Outfit", "Segoe UI", sans-serif';
    ctx.fillStyle = '#5C4D43';
    const infoLines = [
      '• Yarn: Worsted weight wool (approx. 200m / 220yds)',
      '• Needles: US 8 (5.0mm) straight or circular needles',
      '• Gauge: 18 sts x 24 rows = 4" (10cm) in stockinette stitch',
      '• Finished Size: 8" wide x 60" long (easily adjustable)'
    ];
    let infoY = 190;
    infoLines.forEach(line => {
      ctx.fillText(line, 55, infoY);
      infoY += 22;
    });

    // Written Instructions Header
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillStyle = '#4A3B32';
    ctx.fillText('Written Pattern Instructions', 50, 310);

    ctx.font = '13px "Outfit", "Segoe UI", sans-serif';
    ctx.fillStyle = '#5C4D43';
    const instructions = [
      'Cast on 22 stitches loosely.',
      'Row 1 (WS): Knit all stitches.',
      'Row 2 (RS): K2, p2, k4, yo, k1, yo, k4, p2, k5 (24 sts).',
      'Row 3 and all WS rows: K4, p16, k4.',
      'Row 4 (RS): K2, p2, k5, yo, k1, yo, k5, p2, k5 (26 sts).',
      'Row 6 (RS): K2, p2, ssk, k9, k2tog, p2, k5 (24 sts).',
      'Row 8 (RS): K2, p2, ssk, k7, k2tog, p2, k5 (22 sts).',
      'Row 10 (RS): K2, p2, ssk, k5, k2tog, p2, k5 (20 sts).',
      'Row 12 (RS): K2, p2, ssk, k3, k2tog, p2, k5 (18 sts).',
      'Row 13 (WS): Repeat Row 3 (WS).',
      'Row 14 (RS): K2, p2, yo, k1, yo, k2, ssk, k3, k2tog, p2, k5.',
      'Row 16 (RS): K2, p2, k1, yo, k1, yo, k1, ssk, k1, k2tog, p2, k5.',
      'Row 18 (RS): K2, p2, k2, yo, k1, yo, k2, sl1-k2tog-psso, p2, k5.',
      'Row 20 (RS): Knit all stitches (WS).',
      'Repeat Rows 1-20 until scarf measures 58" or desired length,',
      'ending with a Row 20. Bind off all stitches loosely.'
    ];
    let instY = 340;
    instructions.forEach((line, index) => {
      ctx.font = line.startsWith('Row') ? 'bold 13px "Outfit", sans-serif' : '13px "Outfit", sans-serif';
      ctx.fillText(line, 50, instY);
      instY += 21;
    });

    // 4. Right Column: Knitting Chart (Visual Grid)
    const chartX = 460;
    const chartY = 165;
    const cellW = 18;
    const cellH = 18;
    const rowsCount = 20;
    const colsCount = 16;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#4A3B32';
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText('Lace Leaf Chart', chartX, 165);
    
    ctx.font = 'italic 12px Georgia, serif';
    ctx.fillStyle = '#7C6758';
    ctx.fillText('Read RS rows Right-to-Left, WS Left-to-Right', chartX, 185);

    // Draw grid
    ctx.lineWidth = 1;
    for (let r = 0; r < rowsCount; r++) {
      const cy = chartY + 40 + r * cellH;
      // Row numbers on both sides
      ctx.font = 'bold 10px "Outfit", sans-serif';
      ctx.fillStyle = '#8E7355';
      ctx.textAlign = 'right';
      ctx.fillText((rowsCount - r).toString(), chartX - 8, cy + 13);
      ctx.textAlign = 'left';
      ctx.fillText((rowsCount - r).toString(), chartX + colsCount * cellW + 8, cy + 13);

      for (let c = 0; c < colsCount; c++) {
        const cx = chartX + c * cellW;
        ctx.strokeStyle = '#8E7355';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(cx, cy, cellW, cellH);
        ctx.strokeRect(cx, cy, cellW, cellH);

        // Draw symbols inside chart cells based on row & col to make it look real
        // Row 20 (top) down to Row 1 (bottom).
        // Let's create an interesting pattern map.
        const actualRow = rowsCount - r;
        ctx.fillStyle = '#4A3B32';
        ctx.font = '10px "Outfit", sans-serif';
        ctx.textAlign = 'center';

        // Add interesting lace symbols
        if (actualRow % 2 === 0) { // RS rows
          if (c === 4 || c === 12) {
            // Yarn Over (circle)
            ctx.beginPath();
            ctx.arc(cx + cellW/2, cy + cellH/2, 3, 0, Math.PI * 2);
            ctx.strokeStyle = '#4A3B32';
            ctx.lineWidth = 1;
            ctx.stroke();
          } else if (c === 2 || c === 10) {
            // SSK (diagonal left-up line)
            ctx.beginPath();
            ctx.moveTo(cx + 4, cy + cellH - 4);
            ctx.lineTo(cx + cellW - 4, cy + 4);
            ctx.strokeStyle = '#4A3B32';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else if (c === 6 || c === 14) {
            // K2tog (diagonal right-up line)
            ctx.beginPath();
            ctx.moveTo(cx + 4, cy + 4);
            ctx.lineTo(cx + cellW - 4, cy + cellH - 4);
            ctx.strokeStyle = '#4A3B32';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else if (c === 8) {
            // Purl (horizontal dash)
            ctx.beginPath();
            ctx.moveTo(cx + 4, cy + cellH/2);
            ctx.lineTo(cx + cellW - 4, cy + cellH/2);
            ctx.strokeStyle = '#4A3B32';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        } else { // WS rows
          // Purl stitch is blank, knit is dots
          if (c === 8 || c === 0 || c === colsCount - 1) {
            // Knit on WS (dot)
            ctx.beginPath();
            ctx.arc(cx + cellW/2, cy + cellH/2, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#4A3B32';
            ctx.fill();
          }
        }
      }
    }

    // Chart Legend Below Chart
    const legendY = chartY + 60 + rowsCount * cellH;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4A3B32';
    ctx.font = 'bold 14px Georgia, serif';
    ctx.fillText('Chart Legend', chartX, legendY);

    const legendItems = [
      { sym: 'blank', text: 'Knit on RS, Purl on WS' },
      { sym: 'dot', text: 'Purl on RS, Knit on WS' },
      { sym: 'circle', text: 'Yo (Yarn Over)' },
      { sym: 'ssk', text: 'SSK (Slip Slip Knit)' },
      { sym: 'k2tog', text: 'K2tog (Knit 2 Together)' }
    ];

    let legY = legendY + 25;
    legendItems.forEach(item => {
      // Symbol box
      ctx.strokeStyle = '#8E7355';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(chartX, legY - 11, 14, 14);
      ctx.strokeRect(chartX, legY - 11, 14, 14);

      ctx.fillStyle = '#4A3B32';
      ctx.lineWidth = 1;
      
      if (item.sym === 'dot') {
        ctx.beginPath();
        ctx.arc(chartX + 7, legY - 4, 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.sym === 'circle') {
        ctx.beginPath();
        ctx.arc(chartX + 7, legY - 4, 3, 0, Math.PI * 2);
        ctx.stroke();
      } else if (item.sym === 'ssk') {
        ctx.beginPath();
        ctx.moveTo(chartX + 3, legY - 1);
        ctx.lineTo(chartX + 11, legY - 9);
        ctx.stroke();
      } else if (item.sym === 'k2tog') {
        ctx.beginPath();
        ctx.moveTo(chartX + 3, legY - 9);
        ctx.lineTo(chartX + 11, legY - 1);
        ctx.stroke();
      }

      ctx.font = '12px "Outfit", "Segoe UI", sans-serif';
      ctx.fillStyle = '#5C4D43';
      ctx.fillText(item.text, chartX + 25, legY);
      legY += 22;
    });

    // 5. Decorative visual illustration at bottom left (Knitting needles ball of yarn outline)
    ctx.strokeStyle = 'rgba(142, 115, 85, 0.15)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // Simple ball of yarn sketch
    ctx.arc(150, 850, 45, 0, Math.PI * 2);
    ctx.stroke();
    // Needle 1 crossing
    ctx.beginPath();
    ctx.moveTo(90, 890);
    ctx.lineTo(210, 810);
    ctx.stroke();
    // Needle 2 crossing
    ctx.beginPath();
    ctx.moveTo(90, 810);
    ctx.lineTo(210, 890);
    ctx.stroke();

    // Footer page number
    ctx.textAlign = 'center';
    ctx.font = 'italic 11px Georgia, serif';
    ctx.fillStyle = '#9C8675';
    ctx.fillText('Page 1 of 1', canvas.width / 2, canvas.height - 35);

    return canvas;
  },

  getDataURL() {
    return this.createMockPatternCanvas().toDataURL('image/png');
  }
};

window.SamplePattern = SamplePattern;
