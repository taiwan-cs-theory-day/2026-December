async function initSiteContent() {
  const content = await window.siteData.loadJSON('data/site-content.json');
  const main = document.querySelector('main');
  if (!main) return;

  const fillList = (id, values) => {
    const list = document.getElementById(id);
    if (!list) return;
    list.replaceChildren(...values.map(value => {
      const item = document.createElement('li');
      item.textContent = value;
      return item;
    }));
  };

  const about = document.getElementById('about-content');
  if (about) {
    about.replaceChildren(...content.about.map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
  }

  const eventInfo = document.getElementById('event-information');
  if (eventInfo) {
    eventInfo.replaceChildren(...content.eventInformation.map(entry => {
      const line = document.createElement('p');
      const label = document.createElement('strong');
      label.textContent = `${entry.label}: `;
      line.append(label, document.createTextNode(entry.value));
      return line;
    }));
  }

  fillList('local-organizers', content.localOrganizers);
  fillList('special-thanks', content.specialThanks);

  const speakerList = document.getElementById('speaker-category-list');
  if (speakerList) {
    const speakers = await window.siteData.loadSpeakers();
    speakerList.replaceChildren(...speakers.map(speaker => {
      const item = document.createElement('li');
      item.textContent = `${speaker.tabTitle}, ${speaker.affiliation}`;
      return item;
    }));
  }

  const registration = document.getElementById('registration-content');
  if (registration) {
    registration.replaceChildren(...content.registration.map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
  }

  const sponsorshipActions = document.getElementById('sponsorship-actions');
  if (sponsorshipActions) {
    const url = content.paymentLink || content.paymentUrl || '';
    const paymentButton = document.getElementById('sponsorship-payment-button');
    if (paymentButton) {
      paymentButton.textContent = content.paymentLinkLabel || 'I want to Sponsor!';
      if (url) {
        paymentButton.href = url;
      } else {
        paymentButton.removeAttribute('href');
        paymentButton.setAttribute('aria-disabled', 'true');
        paymentButton.textContent = 'Online payment link coming soon.';
      }
    }

    sponsorshipActions.querySelectorAll('.sponsorship-form-button').forEach(link => link.remove());
    if (content.sponsorshipFormLink) {
      const link = document.createElement('a');
      link.className = 'btn sponsorship-form-button';
      link.href = content.sponsorshipFormLink;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = content.sponsorshipFormLinkLabel || 'Certificate / receipt details';
      sponsorshipActions.append(link);
    }
  }
}

window.initSiteContent = initSiteContent;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initSiteContent().catch(console.error));
} else {
  initSiteContent().catch(console.error);
}
