window.venuePageData = {
  address: 'National Yang Ming Chiao Tung University, Guangfu Campus, No. 1001, University Road, East District, Hsinchu City 300093, Taiwan',
  mapUrl: 'https://maps.google.com/?q=National+Yang+Ming+Chiao+Tung+University+Guangfu+Campus',
  venues: [
    {
      marker: 'A',
      name: '次軒廳',
      building: 'Science Building 3 (科學三館)',
      room: 'Basement level (B1)'
    },
    {
      marker: 'B',
      name: '合勤講堂',
      building: 'Engineering Building 4 (工程四館)',
      room: 'EDB13 · Basement level (B1)'
    },
    {
      marker: 'C',
      name: '工程四館 EDB27 教室',
      building: 'Engineering Building 4 (工程四館)',
      room: 'EDB27 · Basement level (B1)'
    }
  ],
  // Each text is { en, zh }: English first, the original Chinese underneath.
  transportation: [
    {
      icon: '🚘',
      title: { en: 'By Car', zh: '自行開車' },
      groups: [
        {
          label: { en: 'Southbound', zh: '南下' },
          items: [{
            en: 'Exit National Freeway 1 at Hsinchu Interchange (94.5K). Heading toward Guangfu Road, turn left at the first traffic light onto Daxue Road (University Road) to reach the North Gate.',
            zh: '中山高速公路新竹交流道(94.5K)下，新竹光復路方向第一個紅綠燈左轉進入大學路，即可抵達本校北大門。'
          }],
          route: {
            en: 'Taipei ⟶ Zhongli ⟶ Hsinchu Interchange (keep right) ⟶ Daxue Rd. ⟶ NYCU Guangfu Campus',
            zh: '台北 ⟶ 中壢 ⟶ 新竹交流道（靠右）⟶ 大學路 ⟶ 交大光復校區'
          }
        },
        {
          label: { en: 'Northbound', zh: '北上' },
          ordered: true,
          items: [
            {
              en: 'Exit National Freeway 1 at Hsinchu Interchange (94.5K) toward Hsinchu, drive along Guangfu Road, then turn left onto Daxue Road to reach the North Gate.',
              zh: '中山高速公路新竹交流道(94.5K)下，往新竹方向，行駛光復路，左轉大學路，即可抵達本校北大門。'
            },
            {
              en: 'Exit National Freeway 1 at Hsinchu Interchange (97K), turn left onto Yuanqu 2nd Road and drive about three minutes; at its end, turn left onto Xin’an Road to reach the South Gate.',
              zh: '中山高速公路新竹交流道(97K)下，左轉園區二路直駛約三分鐘，在園區二路盡頭左轉新安路，即可抵達本校南大門。'
            }
          ],
          route: {
            en: 'Taichung ⟶ National Freeway 1 northbound ⟶ Hsinchu Interchange (turn left toward Hsinchu City) ⟶ Guangfu Rd. ⟶ Daxue Rd. ⟶ NYCU Guangfu Campus',
            zh: '台中 ⟶ 中山高北上 ⟶ 新竹交流道（左轉往新竹市區方向）⟶ 經光復路 ⟶ 大學路 ⟶ 交大光復校區'
          }
        }
      ]
    },
    {
      icon: '🚍',
      title: { en: 'By Intercity Bus', zh: '搭乘客運' },
      groups: [{
        items: [{
          en: 'Take the Ubus (United Highway Bus) “Banqiao – National Freeway 3 – Hsinchu” route, which stops directly at the university.',
          zh: '搭乘統聯「板橋–北二高–新竹」線，即可直達本校。'
        }]
      }]
    },
    {
      icon: '🚆',
      title: { en: 'By High Speed Rail (THSR)', zh: '搭乘高鐵' },
      groups: [{
        items: [{
          en: 'Get off at THSR Hsinchu Station, then take the shuttle bus to the “Chiao Tung University” stop, or take city bus Route 2 to the campus.',
          zh: '高鐵新竹站下車，轉乘接駁專車至「交通大學站」下車，或轉市區 2 路公車至本校。'
        }]
      }]
    },
    {
      icon: '🚌',
      title: { en: 'By City Bus', zh: '搭乘公車' },
      groups: [
        {
          label: { en: 'Hsinchu Bus Route 2 (Hsinchu Train Station ⟶ NYCU)', zh: '新竹客運 2 號（火車站 ⟶ 交通大學）' },
          items: [{ en: 'About once an hour.', zh: '約每小時一班' }],
          route: {
            en: 'Train Station ⟶ Dongmen Market ⟶ Dongmen Elementary School ⟶ Hsinchu Park ⟶ Xueyuan Shopping Center ⟶ NYCU Boai Campus ⟶ National Tsing Hua University ⟶ NYCU Guangfu Campus',
            zh: '火車站 ⟶ 東門市場 ⟶ 東門國小 ⟶ 公園 ⟶ 學園商場 ⟶ 交大博愛校區 ⟶ 清華大學 ⟶ 交大光復校區'
          }
        },
        {
          label: { en: 'Hsinchu Bus Route 1 (Hsinchu Train Station ⟶ Guogou)', zh: '新竹客運 1 號（火車站 ⟶ 過溝）' },
          items: [{ en: 'Every 10–15 minutes.', zh: '約每 10~15 分鐘一班' }]
        },
        {
          label: { en: 'Pilot Bus (Hsinchu Biomedical Science Park ⟶ Beida Bridge)', zh: '先導公車（生醫園區 ⟶ 北大橋）' },
          items: [{ en: 'Every 10–40 minutes.', zh: '約 10-40 分鐘一班' }],
          link: { label: 'Link 連結', href: 'https://www.google.com/search?q=%E6%96%B0%E7%AB%B9%E5%B8%82+%E5%85%88%E5%B0%8E%E5%85%AC%E8%BB%8A' }
        }
      ]
    }
  ],
  accommodation: [
    { name: '新竹老爺酒店 (Hotel Royal Hsinchu)', href: 'https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E7%AB%B9%E8%80%81%E7%88%BA%E9%85%92%E5%BA%97' },
    { name: 'EPISODE 新竹伊普索凱悅尚選酒店 (EPISODE Hsinchu, JdV by Hyatt)', href: 'https://www.hyatt.com/jdv-by-hyatt/en-US/hsujd-episode-hsinchu' },
    { name: '和選旅 THE HO HOTEL', href: 'https://www.thehohotel.com.tw/' },
    { name: '老爺商務旅館 (Royal Inn)', href: 'https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E7%AB%B9%E8%80%81%E7%88%BA%E5%95%86%E5%8B%99%E6%97%85%E9%A4%A8' },
    { name: '新竹元首經典旅館 (Chief Hotel)', href: 'https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E7%AB%B9%E5%85%83%E9%A6%96%E7%B6%93%E5%85%B8%E6%97%85%E9%A4%A8' }
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
    </article>
  `).join('');
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const zh = text => `<span class="zh">${text}</span>`;
  const renderRoute = route => route
    ? `<p class="transport-route">${route.en}<br>${zh(route.zh)}</p>`
    : '';
  const renderGroup = group => {
    const link = group.link ? ` (<a href="${group.link.href}" ${ext}>${group.link.label}</a>)` : '';
    if (!group.label) {
      return group.items.map(item => `<p>${item.en}${link}<br>${zh(item.zh)}</p>`).join('') + renderRoute(group.route);
    }
    const label = `<strong>${group.label.en}</strong> ${zh(group.label.zh)}`;
    const body = group.ordered
      ? `<ol>${group.items.map(item => `<li>${item.en}<br>${zh(item.zh)}</li>`).join('')}</ol>`
      : group.items.map(item => `<br>${item.en}${link}<br>${zh(item.zh)}`).join('');
    return `<li>${label}${body}${renderRoute(group.route)}</li>`;
  };
  const transportList = data.transportation.map(option => {
    const labelled = option.groups.some(g => g.label);
    const inner = labelled
      ? `<ul>${option.groups.map(renderGroup).join('')}</ul>`
      : option.groups.map(renderGroup).join('');
    return `<li><strong><span aria-hidden="true">${option.icon}</span> ${option.title.en}</strong> ${zh(option.title.zh)}${inner}</li>`;
  }).join('');
  const hotels = data.accommodation.map(hotel => `
    <li>${hotel.name} (<a href="${hotel.href}" ${ext}>Link 連結</a>)</li>
  `).join('');
  const usefulLinks = data.links.map(link => `
    <li><a href="${link.href}" ${ext}>${link.label}</a></li>
  `).join('');

  container.innerHTML = `
    <p class="venue-kicker">National Yang Ming Chiao Tung University · Guangfu Campus</p>
    <h1>Venue &amp; Transportation</h1>
    <section aria-labelledby="venue-location-title">
      <h2 id="venue-location-title">Conference Venues</h2>
      <p class="venue-address">${data.address}</p>
      <p><a href="${data.mapUrl}" ${ext}>Open the campus in Google Maps</a></p>
      <div class="venue-grid">${venueCards}</div>
    </section>
    <section aria-labelledby="campus-map-title">
      <h2 id="campus-map-title">Campus Map &amp; Finding the Talks</h2>
      <p>Use the A, B, and C markers on the map to find the building for your session.</p>
      <figure class="venue-map">
        <a href="images/schoolmap.jpg" ${ext} title="Open full-size map">
          <img src="images/schoolmap.jpg" alt="NYCU Hsinchu Guangfu Campus map with venues A (Science Building 3) and B, C (Engineering Building 4) marked" loading="lazy" />
        </a>
        <figcaption>Venue A: Science Building 3, B1. Venues B and C: Engineering Building 4, B1. Click the map to enlarge.</figcaption>
      </figure>
    </section>
    <section aria-labelledby="transport-title">
      <h2 id="transport-title">Transportation ${zh('交通資訊')}</h2>
      <ul class="transport-list">${transportList}</ul>
    </section>
    <section aria-labelledby="hotel-title">
      <h2 id="hotel-title">Accommodation ${zh('住宿資訊')}</h2>
      <ul class="hotel-list">${hotels}</ul>
    </section>
    <section aria-labelledby="useful-links-title">
      <h2 id="useful-links-title">Useful Links</h2>
      <ul class="venue-links">${usefulLinks}</ul>
    </section>
  `;
}

initVenuePage();
