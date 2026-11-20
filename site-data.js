(function() {
  const cache = new Map();

  function appendCacheBuster(url) {
    return window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function'
      ? window.cacheUtils.appendCacheBuster(url)
      : url;
  }

  async function fetchText(url) {
    if (!cache.has(url)) {
      const request = fetch(appendCacheBuster(url), { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
          return response.text();
        });
      cache.set(url, request);
    }
    return cache.get(url);
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];
      if (quoted) {
        if (character === '"' && text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else if (character === '"') {
          quoted = false;
        } else {
          field += character;
        }
      } else if (character === '"' && field.length === 0) {
        quoted = true;
      } else if (character === ',') {
        row.push(field.trim());
        field = '';
      } else if (character === '\n' || character === '\r') {
        if (character === '\r' && text[index + 1] === '\n') index += 1;
        row.push(field.trim());
        if (row.some(value => value !== '')) rows.push(row);
        row = [];
        field = '';
      } else {
        field += character;
      }
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field.trim());
      if (row.some(value => value !== '')) rows.push(row);
    }
    if (rows.length === 0) return [];

    const headers = rows.shift().map(value => value.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9_]/g, ''));
    return rows.map((values, index) => {
      const record = { idx: index };
      headers.forEach((header, column) => {
        record[header] = values[column] || '';
      });
      return record;
    });
  }

  function loadCSV(url) {
    return fetchText(url).then(parseCSV);
  }

  function loadJSON(url) {
    return fetchText(url).then(text => JSON.parse(text));
  }

  function loadSpeakers() {
    return loadCSV('data/Theoryday_2026_DEC.csv').then(rows => rows
      .filter(row => {
        const speaker = String(row.speaker || '').trim();
        return speaker && !speaker.startsWith('#');
      })
      .map(row => {
        const rawCategory = String(row.category || '').trim().toLowerCase();
        const normalizedCategory = rawCategory.startsWith('plenary') ? 'plenary' : rawCategory;
        return {
          ...row,
          categoryRaw: rawCategory,
          category: normalizedCategory,
          name: row.speaker || '',
          tabTitle: (row.speaker || '').split('/')[0].trim(),
          // Speakers without a photo get a grey silhouette instead of an empty frame
          photo: String(row.image_link || '').trim() || 'images/speakers/placeholder.svg',
          talkTitle: row.talktitle || '',
          type: normalizedCategory === 'keynote' ? 'Keynote Lecture'
            : normalizedCategory === 'diskeynote' ? 'Distinguished Keynote'
            : 'Invited Talks'
        };
      }));
  }

  // Math in titles/abstracts is written as LaTeX ($...$, \[...\]); KaTeX is loaded only when needed.
  const KATEX_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/';
  let katexPromise = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  function loadKatex() {
    if (!katexPromise) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${KATEX_BASE}katex.min.css`;
      document.head.appendChild(link);
      katexPromise = loadScript(`${KATEX_BASE}katex.min.js`)
        .then(() => loadScript(`${KATEX_BASE}contrib/auto-render.min.js`))
        .catch(error => {
          katexPromise = null;
          throw error;
        });
    }
    return katexPromise;
  }

  const MATH_PATTERN = /\$[^$]+\$|\\\[|\\\(/;

  function renderMath(element) {
    if (!element || !MATH_PATTERN.test(element.textContent || '')) return Promise.resolve();
    return loadKatex().then(() => {
      window.renderMathInElement(element, {
        delimiters: [
          { left: '\\[', right: '\\]', display: true },
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }).catch(error => console.warn('Math rendering skipped:', error));
  }

  window.siteData = { loadCSV, loadJSON, loadSpeakers, parseCSV, renderMath };
})();
