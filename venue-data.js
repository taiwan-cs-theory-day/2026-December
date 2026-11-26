window.venuePageData = {
  address: 'National Yang Ming Chiao Tung University, Guangfu Campus, No. 1001, University Road, East District, Hsinchu City 300093, Taiwan',
  mapUrl: 'https://maps.google.com/?q=National+Yang+Ming+Chiao+Tung+University+Guangfu+Campus',
  // Bump ?v= whenever images/schoolmap.jpg changes, so browsers/CDN fetch the new file
  mapImage: 'images/schoolmap.jpg?v=2026-11-19-1',
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
          en: 'Get off at THSR Hsinchu Station, then take the shuttle bus to the “Chiao Tung University” stop, or take the Pilot Bus to the campus.',
          zh: '高鐵新竹站下車，轉乘接駁專車至「交通大學站」下車，或轉乘先導公車至本校。'
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
    { name: '老爺商務旅館 (Royal Inn)', href: 'https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E7%AB%B9%E8%80%81%E7%88%BA%E5%95%86%E5%8B%99%E6%97%85%E9%A4%A8' }
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
    <article class="venue-row">
      <span class="venue-marker" aria-label="Map marker ${venue.marker}">${venue.marker}</span>
      <h3>${venue.name}</h3>
      <p><span class="venue-field">Building:</span> ${venue.building}</p>
      <p><span class="venue-field">Room / floor:</span> ${venue.room}</p>
    </article>
  `).join('');
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const zh = text => `<span class="zh">${text}</span>`;
  // Each piece of text is shown as an English line with the Chinese directly below it.
  const pair = (item, extra = '') => `<p class="bi">${item.en}${extra}<span class="zh">${item.zh}</span></p>`;
  const renderRoute = route => route
    ? `<p class="transport-route">${route.en}<span class="zh">${route.zh}</span></p>`
    : '';
  const renderGroup = group => {
    const link = group.link ? ` (<a href="${group.link.href}" ${ext}>${group.link.label}</a>)` : '';
    const label = group.label
      ? `<h4>${group.label.en} <span class="zh">${group.label.zh}</span></h4>`
      : '';
    const body = group.ordered
      ? `<ol>${group.items.map(item => `<li>${pair(item)}</li>`).join('')}</ol>`
      : group.items.map(item => pair(item, link)).join('');
    return `<div class="transport-group">${label}${body}${renderRoute(group.route)}</div>`;
  };
  const transportList = data.transportation.map(option => `
    <div class="transport-mode">
      <h3 class="transport-title">${option.title.en}<span class="zh">${option.title.zh}</span></h3>
      <div class="transport-body">${option.groups.map(renderGroup).join('')}</div>
    </div>
  `).join('');
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
      <div class="venue-table">${venueCards}</div>
    </section>
    <section aria-labelledby="campus-map-title">
      <h2 id="campus-map-title">Campus Map &amp; Finding the Talks</h2>
      <p>Use the A, B, and C markers on the map to find the building for your session.</p>
      <figure class="venue-map">
        <a href="${data.mapImage}" ${ext} title="Open full-size map">
          <img src="${data.mapImage}" alt="NYCU Hsinchu Guangfu Campus map with venues A (Science Building 3) and B, C (Engineering Building 4) marked" loading="lazy" />
        </a>
        <figcaption>Venue A: Science Building 3, B1. Venues B and C: Engineering Building 4, B1. Click the map to enlarge.</figcaption>
      </figure>
    </section>
    <section aria-labelledby="transport-title">
      <h2 id="transport-title">Transportation ${zh('交通資訊')}</h2>
      <div class="transport-list">${transportList}</div>
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
