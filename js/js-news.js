/* ============================================================
   NEWS PAGE
   ============================================================ */

const newsData = [
    { title: 'Nigeria Announces $2.5B Infrastructure Development Fund', time: '2 hours ago', tag: 'Breaking', content: 'The Federal Government of Nigeria has announced a $2.5 billion infrastructure development fund.' },
    { title: 'Lagos State Approves New Housing Scheme for Civil Servants', time: '4 hours ago', tag: 'Policy', content: 'The Lagos State Government has approved a new housing scheme for civil servants.' },
    { title: 'New Safety Regulations for Construction Sites in Lagos', time: '6 hours ago', tag: 'Safety', content: 'The Lagos State Safety Commission has introduced new safety regulations.' },
    { title: 'Globacom Completes 500 New Telecom Sites Across Nigeria', time: '8 hours ago', tag: 'Telecom', content: 'Globacom has announced the successful completion of 500 new telecom sites.' },
    { title: 'FUTA Researchers Develop Sustainable Building Material', time: '12 hours ago', tag: 'Research', content: 'Researchers at FUTA have developed a sustainable building material from agricultural waste.' },
    { title: 'LASUTECH Ikorodu Campus Construction Nears Completion', time: '1 day ago', tag: 'Education', content: 'Construction of the new Ikorodu Campus is nearing completion.' }
];

function loadNews() {
    const feed = document.getElementById('newsFeed');
    if (!feed) return;

    feed.innerHTML = newsData.map(news => `
        <div class="news-item" onclick="openNews('${news.title.replace(/'/g, "\\'")}')">
            <span class="news-badge">${news.tag}</span>
            <span class="news-title">${news.title}</span>
            <span class="news-time"><i class="far fa-clock me-1"></i>${news.time}</span>
        </div>
    `).join('');
}

function openNews(title) {
    const news = newsData.find(n => n.title === title);
    if (!news) return;
    const modal = new bootstrap.Modal(document.getElementById('newsModal'));
    document.getElementById('newsModalTitle').textContent = news.title;
    document.getElementById('newsModalBody').innerHTML = `
        <div style="margin-bottom:16px;">
            <span class="news-badge" style="background:rgba(184,134,11,0.1);color:#b8860b;padding:3px 10px;border-radius:20px;font-size:9px;font-weight:700;">${news.tag}</span>
            <span style="color:#666;font-size:12px;margin-left:8px;"><i class="far fa-clock"></i> ${news.time}</span>
        </div>
        <p style="line-height:1.8;font-size:15px;">${news.content}</p>
    `;
    modal.show();
}

document.addEventListener('DOMContentLoaded', loadNews);