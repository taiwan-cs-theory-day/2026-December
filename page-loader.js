// Single Page Navigation - Load only content without reloading header
(function() {
  function getRouteKey(pathValue) {
    const raw = (pathValue || '').split('?')[0].split('#')[0];
    const trimmed = raw.replace(/\/+$/, '');
    const segment = trimmed.split('/').pop();
    if (!segment) return 'index';
    return segment.replace(/\.html$/i, '').toLowerCase();
  }

  // List of pages and their corresponding files
  const pages = {
    'index.html': { title: 'NYCU Theory Day 2026', file: 'index.html' },
    'speaker.html':{title:'Speaker – NYCU Theory Day 2026', file:'speaker.html'},
    'program.html': { title: 'Program – NYCU Theory Day 2026', file: 'program.html' },
    'venue.html': { title: 'Venue & Transportation – NYCU Theory Day 2026', file: 'venue.html' },
    'registration.html': { title: 'Registration – NYCU Theory Day 2026', file: 'registration.html' },
    'theory-day-april.html': { title: 'Past Events – NYCU Theory Day 2026', file: 'theory-day-april.html' },
    'city-tour.html': { title: 'City Tour – NYCU Theory Day 2026', file: 'city-tour.html' }
  };

  function loadPage(pageName, options = {}) {
    const { pushHistory = true } = options;
    const pageInfo = pages[pageName];
    if (!pageInfo) return false;

    // Fetch the page
    const xhr = new XMLHttpRequest();
    const requestUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
      ? window.cacheUtils.appendCacheBuster(pageName)
      : pageName;
    xhr.open('GET', requestUrl, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    xhr.setRequestHeader('Pragma', 'no-cache');
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Parse the loaded page
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(xhr.responseText, 'text/html');
        
        // Extract content areas from the loaded page
        const newMain = newDoc.querySelector('main');
        const newFooter = newDoc.querySelector('footer');
        
        // Get current container
        const pageContainer = document.querySelector('.page-container');
        if (!pageContainer) return;
        
        // Get current content areas
        const currentMain = pageContainer.querySelector('main');
        const currentFooter = pageContainer.querySelector('footer');
        
        // Replace content smoothly
        if (newMain && currentMain) {
          // Strip <script> tags from the fetched fragment and insert the
          // remaining HTML; scripts will be appended and executed explicitly.
          const temp = document.createElement('div');
          temp.innerHTML = newMain.innerHTML;
          temp.querySelectorAll('script').forEach(s => s.remove());
          currentMain.innerHTML = temp.innerHTML;
          // Execute any scripts present in the loaded main (they don't run when inserted via innerHTML)
          const scripts = newMain.querySelectorAll('script');
          // create a base URL for resolving script src relative to the fetched page
          // resolve the pageName against the current location so relative
          // script paths in the fragment point to the correct directory
          const baseForNewDoc = new URL(String(pageName), window.location.href).href;
          const scriptPromises = [];
          scripts.forEach(s => {
            const src = s.getAttribute('src');
            if (src) {
              // resolve relative src against the fetched page's path to avoid wrong relative resolution
              let resolvedSrc;
              try {
                resolvedSrc = new URL(src, baseForNewDoc).href;
              } catch (e) {
                resolvedSrc = src; // fallback
              }

              // avoid loading duplicates
              const exists = Array.from(document.scripts).some(ds => {
                const dsSrc = ds.getAttribute('src') || ds.src || '';
                return dsSrc === resolvedSrc || dsSrc.endsWith('/' + src) || dsSrc === src;
              });
              if (!exists) {
                const scr = document.createElement('script');
                const freshSrc = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
                  ? window.cacheUtils.appendCacheBuster(resolvedSrc)
                  : resolvedSrc;
                scr.src = freshSrc;
                scr.async = false;
                const p = new Promise((resolve, reject) => {
                  scr.onload = () => resolve(resolvedSrc);
                  scr.onerror = (e) => reject(new Error('Failed to load ' + resolvedSrc));
                });
                scriptPromises.push(p);
                document.body.appendChild(scr);
              }
            } else {
              // inline script -> evaluate immediately
              try {
                const code = s.textContent || s.innerText || '';
                if (code.trim()) {
                  const scr = document.createElement('script');
                  scr.text = code;
                  document.body.appendChild(scr);
                }
              } catch (err) {
                console.error('Error evaluating inline script from loaded page', err);
              }
            }
          });

          // Wait for any external scripts appended from the fragment to load,
          // then run any page-specific initializers if present.
          Promise.all(scriptPromises).then(() => {
            if (typeof initSchedule === 'function') {
              try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
            }
            if (typeof initSpeakers === 'function') {
              try { initSpeakers(); } catch (e) { console.error('initSpeakers error', e); }
            }
            if (typeof initSiteContent === 'function') {
              try { initSiteContent(); } catch (e) { console.error('initSiteContent error', e); }
            }
            if (typeof initVenuePage === 'function') {
              try { initVenuePage(); } catch (e) { console.error('initVenuePage error', e); }
            }
          }).catch(err => {
            console.error('Error loading scripts from page fragment', err);
            // best-effort: still attempt initialization
            if (typeof initSchedule === 'function') try { initSchedule(); } catch(e){}
            if (typeof initSpeakers === 'function') try { initSpeakers(); } catch(e){}
            if (typeof initSiteContent === 'function') try { initSiteContent(); } catch(e){}
            if (typeof initVenuePage === 'function') try { initVenuePage(); } catch(e) { console.error('initVenuePage error', e); }
          });
        }
        
        if (newFooter && currentFooter) {
          currentFooter.innerHTML = newFooter.innerHTML;
        }
        
        // Update page title
        document.title = pageInfo.title;
        
        // Update URL without page reload
        if (pushHistory) {
          window.history.pushState({ page: pageName }, pageInfo.title, pageName);
        }
        
        // Update active navigation link
        updateActiveLink(pageName);
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const toggle = document.querySelector('.nav-toggle');
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggle.classList.remove('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
      }
    };
    
    xhr.onerror = function() {
      console.error('Error loading page:', pageName);
    };
    
    xhr.send();
    return true;
  }

  function updateActiveLink(pageName) {
    const routeKey = getRouteKey(pageName);
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.remove('active');
      if (getRouteKey(href) === routeKey) {
        link.classList.add('active');
      }
    });
  }

  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip external links
      if (href.startsWith('http')) {
        return;
      }
      
      // Skip non-HTML pages
      if (!href.endsWith('.html')) {
        return;
      }
      
      // Let the browser handle pages that are not configured for SPA navigation.
      if (!pages[href]) {
        return;
      }

      link.addEventListener('click', function(e) {
        e.preventDefault();
        updateActiveLink(href);
        loadPage(href);
      });
    });
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
      loadPage(e.state.page, { pushHistory: false });
    }
  });

  // Setup navigation when header is loaded
  const observer = new MutationObserver(function(mutations) {
    const header = document.querySelector('.header-bar');
    if (header) {
      setupNavigation();
      observer.disconnect();
    }
  });

  // Start observing the page-container for header insertion
  const pageContainer = document.querySelector('.page-container');
  if (pageContainer) {
    observer.observe(pageContainer, { childList: true, subtree: true });
  }

  // Initial setup in case header is already loaded
  setupNavigation();
  updateActiveLink(window.location.pathname);

  // Initialize page-specific scripts on first load
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof initSpeakers === "function") {
      initSpeakers();
    }
    if (typeof initSchedule === "function") {
      initSchedule();
    }
    if (typeof initSiteContent === "function") {
      initSiteContent();
    }
  });

})();
