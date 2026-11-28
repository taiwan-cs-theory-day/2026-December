let scheduleRows = [];
let scheduleSpeakers = [];
let scheduleInitPromise;

function escapeScheduleText(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
}

function splitSpeakerList(value) {
  const text = String(value || '').trim();
  if (!text) return [];

  const parts = [];
  let current = '';
  let parenthesesDepth = 0;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (character === '(') {
      parenthesesDepth += 1;
      current += character;
      continue;
    }

    if (character === ')') {
      parenthesesDepth = Math.max(0, parenthesesDepth - 1);
      current += character;
      continue;
    }

    if (parenthesesDepth === 0 && character === ',') {
      const part = current.trim();
      if (part) parts.push(part);
      current = '';
      continue;
    }

    if (parenthesesDepth === 0 && text.slice(index, index + 5).toLowerCase() === ' and ') {
      const part = current.trim();
      if (part) parts.push(part);
      current = '';
      index += 4;
      continue;
    }

    current += character;
  }

  const trailing = current.trim();
  if (trailing) parts.push(trailing);

  return parts
    .map(part => part.replace(/^and\s+/i, '').trim())
    .filter(Boolean);
}

function getSpeakerRecord(value) {
  const candidates = splitSpeakerList(value)
    .map(name => name.split(' (')[0].trim())
    .filter(Boolean);
  const tokens = name => name.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  return scheduleSpeakers.find(speaker => {
    const aliases = [speaker.tabTitle, ...(speaker.name || '').split('/')];
    return candidates.some(candidate => {
      const candidateTokens = tokens(candidate);
      return aliases.some(alias => {
        const aliasTokens = new Set(tokens(alias));
        return candidateTokens.length > 0 && candidateTokens.every(token => aliasTokens.has(token));
      });
    });
  });
}

function makeSpeakerLinks(value) {
  const names = splitSpeakerList(value);
  return names.map(name => `<a href="#" class="speaker-link" data-speaker="${escapeScheduleText(name)}">${escapeScheduleText(name)}</a>`).join(', ');
}

function showScheduleSpeaker(name) {
  const speaker = getSpeakerRecord(name);
  if (!speaker) return;
  const modal = document.getElementById('speaker-modal');
  const photo = document.getElementById('speaker-modal-photo');
  const nameNode = document.getElementById('speaker-modal-name');
  const affiliation = document.getElementById('speaker-modal-affiliation');
  const talkTitle = document.getElementById('speaker-modal-talk-title');
  const abstract = document.getElementById('speaker-modal-abstract');
  const talkTitleRow = document.getElementById('speaker-modal-talk-title-row');
  const abstractRow = document.getElementById('speaker-modal-abstract-row');
  if (!modal || !photo || !nameNode || !affiliation || !talkTitle || !abstract || !talkTitleRow || !abstractRow) return;

  photo.src = speaker.photo || '';
  nameNode.textContent = speaker.name || '';
  affiliation.textContent = speaker.affiliation || '';
  talkTitle.textContent = speaker.talkTitle || '';
  abstract.textContent = speaker.abstract || '';
  talkTitleRow.style.display = speaker.talkTitle ? 'block' : 'none';
  abstractRow.style.display = speaker.abstract ? 'block' : 'none';
  window.siteData?.renderMath?.(talkTitle);
  window.siteData?.renderMath?.(abstract);
  modal.classList.add('show');
  document.body.classList.add('modal-open');
}

function bindSpeakerLinks(container) {
  container.querySelectorAll('.speaker-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showScheduleSpeaker(link.dataset.speaker);
    });
  });
}

function renderScheduleDay(day) {
  const container = document.getElementById('schedule-day');
  if (!container) return;
  container.replaceChildren();
  const items = scheduleRows.filter(row => String(row.day) === String(day)).sort((first, second) => {
    const timeValue = item => {
      const match = String(item.time || '').match(/(\d{1,2}):(\d{2})/);
      if (match) return Number(match[1]) * 60 + Number(match[2]);
      const next = scheduleRows.slice(item.idx + 1).find(row => row.day === item.day && row.time);
      if (!next) return Number.POSITIVE_INFINITY;
      const nextTime = next.time.match(/(\d{1,2}):(\d{2})/);
      return nextTime ? Number(nextTime[1]) * 60 + Number(nextTime[2]) - 0.01 : Number.POSITIVE_INFINITY;
    };
    return timeValue(first) - timeValue(second) || first.idx - second.idx;
  });
  const heading = document.createElement('div');
  heading.className = 'day-header';
  heading.textContent = items[0]?.date ? `Day ${day} - ${items[0].date}` : `Day ${day}`;
  container.appendChild(heading);

  items.forEach(item => {
    const matchedSpeaker = getSpeakerRecord(item.speaker);
    const title = matchedSpeaker?.talkTitle || item.title || '';
    const time = item.time || '';
    const row = document.createElement('div');
    const type = String(item.type || '').toLowerCase();
    const normalizedTitle = String(title).toLowerCase();
    const rowClasses = [
      'talk',
      type === 'plenary' ? 'plenary' : '',
      type === 'keynote' ? 'keynote' : '',
      type.includes('break') ? 'break' : '',
      type.includes('panel') ? 'panel' : '',
      !item.time ? 'chairman-row' : ''
    ];

    if (!item.time) {
      rowClasses.push('separator-row');
      if (normalizedTitle.includes('keynote')) rowClasses.push('separator-keynote');
      else if (normalizedTitle.includes('invited')) rowClasses.push('separator-invited');
    }

    if (normalizedTitle.includes('coffee break')) rowClasses.push('separator-coffee');
    if (normalizedTitle.includes('lunch')) rowClasses.push('separator-lunch');

    row.className = rowClasses.filter(Boolean).join(' ');
    const speaker = item.speaker ? makeSpeakerLinks(item.speaker) : '';
    row.innerHTML = `<div class="time">${escapeScheduleText(time)}</div><div class="content"><div class="title">${escapeScheduleText(title)}</div>${speaker ? `<div class="speaker">${speaker}</div>` : ''}</div>`;
    container.appendChild(row);
  });

  bindSpeakerLinks(container);
  window.siteData?.renderMath?.(container);
}

async function initSchedule() {
  const tabs = document.getElementById('day-tabs');
  const container = document.getElementById('schedule-day');
  if (!tabs || !container || !window.siteData) return;
  if (!scheduleInitPromise) {
    scheduleInitPromise = Promise.all([
      window.siteData.loadCSV('data/schedule.csv'),
      window.siteData.loadSpeakers()
    ]).then(([rows, speakers]) => {
      scheduleSpeakers = speakers;
      let lastDay = '';
      let lastDate = '';
      rows.forEach((row, index) => {
        if (row.day) {
          lastDay = row.day;
          if (row.date) lastDate = row.date;
          else row.date = lastDate;
          return;
        }
        const nextExplicit = rows.slice(index + 1).find(next => next.day);
        if (!row.time && nextExplicit && nextExplicit.day !== lastDay) {
          row.day = nextExplicit.day;
          row.date = nextExplicit.date || lastDate;
        } else {
          row.day = lastDay;
          row.date = row.date || lastDate;
        }
      });
      scheduleRows = rows;
    }).catch(error => {
      scheduleInitPromise = null;
      throw error;
    });
  }
  await scheduleInitPromise;

  const days = [...new Set(scheduleRows.map(row => row.day).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  const activeDay = tabs.querySelector('.day-tab.active')?.dataset.day || days[0];
  tabs.replaceChildren(...days.map(day => {
    const button = document.createElement('button');
    const date = scheduleRows.find(row => row.day === day)?.date || '';
    button.className = `day-tab${day === activeDay ? ' active' : ''}`;
    button.dataset.day = day;
    button.textContent = date ? `Day ${day} - ${date}` : `Day ${day}`;
    button.addEventListener('click', () => {
      tabs.querySelectorAll('.day-tab').forEach(tab => tab.classList.toggle('active', tab === button));
      renderScheduleDay(day);
    });
    return button;
  }));
  renderScheduleDay(activeDay);

  const download = document.getElementById('download-program-pdf');
  if (download && !download.dataset.attached) {
    download.dataset.attached = 'true';
    download.addEventListener('click', () => {
      ['TheoryDay_program_poster_p1.pdf', 'TheoryDay_program_poster_p2.pdf'].forEach(file => {
        const link = document.createElement('a');
        link.href = file;
        link.download = file;
        link.click();
      });
    });
  }

  const modal = document.getElementById('speaker-modal');
  if (modal && !modal.dataset.attached) {
    modal.dataset.attached = 'true';
    modal.addEventListener('click', event => {
      if (event.target === modal || event.target.classList.contains('speaker-modal-close')) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
      }
    });
  }

  bindSpeakerLinks(container);
}

window.initSchedule = initSchedule;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initSchedule().catch(console.error));
} else {
  initSchedule().catch(console.error);
}
