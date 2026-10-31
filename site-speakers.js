async function initSpeakers() {
  const categoryTabs = document.getElementById('speaker-category-tabs');
  const speakerTabs = document.getElementById('speaker-tabs');
  if (!categoryTabs || !speakerTabs || !window.siteData) return;

  const [speakers, content] = await Promise.all([
    window.siteData.loadSpeakers(),
    window.siteData.loadJSON('data/site-content.json')
  ]);
  categoryTabs.replaceChildren();
  speakerTabs.replaceChildren();

  let activeCategory = content.speakerCategories[0]?.key || '';

  function speakersFor(category) {
    return speakers.filter(speaker => speaker.category === category);
  }

  function selectSpeaker(speaker, button) {
    speakerTabs.querySelectorAll('.speaker-tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('speaker-photo').src = speaker.photo;
    document.getElementById('speaker-name').textContent = speaker.name;
    document.getElementById('speaker-affiliation').textContent = speaker.affiliation;
    document.getElementById('speaker-title').textContent = speaker.title;
    const subtitle = document.getElementById('speaker-subtitle');
    if (subtitle) {
      subtitle.textContent = speaker.subtitle || '';
      subtitle.style.display = speaker.subtitle ? 'block' : 'none';
    }
    const honor = document.getElementById('speaker-honor');
    if (honor) {
      honor.textContent = speaker.honor || '';
      honor.style.display = speaker.honor ? 'block' : 'none';
    }
    document.getElementById('speaker-expertise').textContent = speaker.expertise; // || 'TBA';
    const type = document.getElementById('speaker-type');
    if (type) type.textContent = speaker.type;
    const hasDetails = Boolean(speaker.talkTitle || speaker.abstract);
    document.getElementById('speaker-abstract-box').style.display = hasDetails ? 'block' : 'none';
    document.getElementById('speaker-talk-title').textContent = speaker.talkTitle;
    document.getElementById('speaker-abstract').textContent = speaker.abstract;
  }

  function renderCategory(category) {
    activeCategory = category.key;
    categoryTabs.querySelectorAll('.speaker-category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.categoryKey === category.key);
    });
    speakerTabs.replaceChildren();
    const records = speakersFor(category.key);
    records.forEach(speaker => {
      const button = document.createElement('button');
      button.className = 'speaker-tab';
      button.textContent = speaker.tabTitle;
      button.addEventListener('click', () => selectSpeaker(speaker, button));
      speakerTabs.appendChild(button);
    });
    if (records.length) selectSpeaker(records[0], speakerTabs.firstElementChild);
    else document.getElementById('speaker-name').textContent = 'No speakers yet';
  }

  content.speakerCategories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'speaker-category-tab';
    button.dataset.categoryKey = category.key;
    button.textContent = category.label;
    button.addEventListener('click', () => renderCategory(category));
    categoryTabs.appendChild(button);
  });

  const initial = content.speakerCategories.find(category => category.key === activeCategory);
  if (initial) renderCategory(initial);
}

window.initSpeakers = initSpeakers;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initSpeakers().catch(console.error));
} else {
  initSpeakers().catch(console.error);
}
