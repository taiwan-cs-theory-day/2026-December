window.venuePageData = {
  address: 'National Yang Ming Chiao Tung University, Guangfu Campus, No. 1001, University Road, East District, Hsinchu City 300093, Taiwan',
  mapUrl: 'https://maps.google.com/?q=National+Yang+Ming+Chiao+Tung+University+Guangfu+Campus',
  venues: [
    {
      marker: 'A',
      name: '次軒廳 (Ci-Xuan Hall)',
      building: 'Science Building 3 (科學三館)',
      room: 'Basement level (B1)',
      description: 'Follow marker A on the campus map to Science Building 3, then go down to B1.'
    },
    {
      marker: 'B',
      name: '合勤講堂 (Qisda Auditorium)',
      building: 'Engineering Building 4 (工程四館)',
      room: 'EDB13 · Basement level (B1)',
      description: 'The auditorium is reported to seat 308 people, including 4 accessible seats. Please confirm capacity and accessibility arrangements with the organizers.'
    },
    {
      marker: 'C',
      name: 'EDB27',
      building: 'Engineering Building 4 (工程四館)',
      room: 'EDB27 · floor to be confirmed',
      description: 'Use marker C to locate Engineering Building 4. The room floor and capacity have not been confirmed.'
    }
  ],
  transportation: [
    {
      icon: '🚌',
      title: 'From Hsinchu TRA Railway Station',
      description: 'Hsinchu City Bus No. 2 is a suggested connection to the NYCU Guangfu Campus area. Check the latest route, stop name, and timetable before departure. Taxis are also available at the station.',
      estimate: 'Around 20–30 minutes by bus is an estimate only; actual travel time depends on traffic and service.'
    },
    {
      icon: '🚄',
      title: 'From HSR Hsinchu Station',
      description: 'A local bus, including the suggested Kuo-Kuang Bus No. 182 connection toward NYCU/Guangfu Road, or a taxi can take you to campus. The current stop name and bus service should be verified before travel.',
      estimate: 'Taxi estimates of 20–25 minutes are traffic-dependent and are not guaranteed.'
    },
    {
      icon: '🚆',
      title: 'From Taipei',
      description: 'Take the Taiwan High Speed Rail to Hsinchu Station, then transfer to local transportation or a taxi to Guangfu Campus. Intercity buses between Taipei and Hsinchu are another option; check current operators and schedules.',
      estimate: 'Allow extra time for the transfer to campus; no end-to-end journey time is specified.'
    }
  ],
  links: [
    { label: 'NYCU Official Website', href: 'https://www.nycu.edu.tw/' },
    { label: 'NYCU Transportation Information', href: 'https://www.nycu.edu.tw/ga/en/' },
    { label: 'Taiwan High Speed Rail', href: 'https://www.thsrc.com.tw/' },
    { label: 'Taiwan Railway', href: 'https://www.railway.gov.tw/' }
  ]
};

function initVenuePage() {
  const container = document.getElementById('venue-page');
  if (!container || !window.venuePageData) return;

  const data = window.venuePageData;
  const venueCards = data.venues.map(venue => `
    <article class="venue-card">
      <span class="venue-marker" aria-label="Map marker ${venue.marker}">${venue.marker}</span>
      <h3>${venue.name}</h3>
      <p><strong>Building:</strong> ${venue.building}</p>
      <p><strong>Room / floor:</strong> ${venue.room}</p>
      <p>${venue.description}</p>
    </article>
  `).join('');
  const transportCards = data.transportation.map(option => `
    <article class="transport-card">
      <h3><span aria-hidden="true">${option.icon}</span> ${option.title}</h3>
      <p>${option.description}</p>
      <p><strong>Travel time:</strong> ${option.estimate}</p>
    </article>
  `).join('');
  const usefulLinks = data.links.map(link => `
    <li><a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>
  `).join('');

  container.innerHTML = `
    <p class="venue-kicker">National Yang Ming Chiao Tung University · Guangfu Campus</p>
    <h1>Venue &amp; Transportation</h1>
    <section aria-labelledby="venue-location-title">
      <h2 id="venue-location-title">Conference Venues</h2>
      <p class="venue-address">${data.address}</p>
      <p><a href="${data.mapUrl}" target="_blank" rel="noopener noreferrer">Open the campus in Google Maps</a></p>
      <div class="venue-grid">${venueCards}</div>
    </section>
    <section aria-labelledby="campus-map-title">
      <h2 id="campus-map-title">Campus Map &amp; Finding the Talks</h2>
      <p>Use the existing map and its A, B, and C markers to find the building for your session. Check the venue cards above for the room and floor, then allow time to navigate inside the building.</p>
      <figure class="venue-map">
        <img src="images/schoolmap.jpg" alt="NYCU Guangfu Campus map with conference venues A, B, and C marked" loading="lazy" />
        <figcaption>NYCU Guangfu Campus map. Venue A: Science Building 3, B1. Venues B and C: Engineering Building 4.</figcaption>
      </figure>
    </section>
    <section aria-labelledby="transport-title">
      <h2 id="transport-title">How to Get Here</h2>
      <div class="transport-grid">${transportCards}</div>
      <p class="venue-note"><strong>Please verify before traveling:</strong> Bus routes, stop names, timetables, and estimated journey times can change. Check current operator information before setting out.</p>
    </section>
    <section aria-labelledby="visitor-title">
      <h2 id="visitor-title">Campus Visitor Information</h2>
      <p>The venues are within Guangfu Campus. Please arrive at least 15 minutes before your session to locate the building and room.</p>
      <p>Visitors arriving by car or motorcycle should follow campus visitor parking signs. Parking availability may be limited; public transportation is encouraged where convenient.</p>
      <p>For taxi directions, show the driver the campus address above and the Chinese building name: 科學三館 for A, 工程四館 for B and C.</p>
    </section>
    <section aria-labelledby="useful-links-title">
      <h2 id="useful-links-title">Useful Links</h2>
      <ul class="venue-links">${usefulLinks}</ul>
    </section>
  `;
}

initVenuePage();
