/* ============================================================
   BLOG PAGE
   ============================================================ */

const blogPosts = [
    {
        title: "10 Essential Safety Practices Every Site Manager Must Know",
        date: "2026-08-15",
        tags: ["Construction", "Safety"],
        excerpt: "Discover the critical safety protocols that protect workers and ensure project success on construction sites.",
        read_time: 5,
        content: `<h4>Introduction</h4>
            <p>Safety on construction sites is not just a regulatory requirement — it is a moral obligation. Here are 10 essential safety practices:</p>
            <ol>
                <li><strong>Conduct Regular Safety Training</strong></li>
                <li><strong>Perform Daily Site Inspections</strong></li>
                <li><strong>Enforce PPE Usage</strong></li>
                <li><strong>Maintain Clear Communication</strong></li>
                <li><strong>Implement Fall Protection</strong></li>
                <li><strong>Control Hazardous Materials</strong></li>
                <li><strong>Ensure Equipment Safety</strong></li>
                <li><strong>Develop Emergency Plans</strong></li>
                <li><strong>Encourage a Safety Culture</strong></li>
                <li><strong>Learn from Incidents</strong></li>
            </ol>
            <p><em>— Pamilerin I. Sanni, Construction Manager</em></p>`
    },
    {
        title: "Sustainable Building Materials: The Future of Construction in Nigeria",
        date: "2026-08-10",
        tags: ["Sustainability"],
        excerpt: "Exploring eco-friendly materials that reduce environmental impact while maintaining structural integrity.",
        read_time: 7,
        content: `<h4>Introduction</h4>
            <p>Nigeria's construction industry is rapidly evolving, and sustainable building materials are at the forefront.</p>
            <ul>
                <li><strong>Agro-Waste Composites</strong></li>
                <li><strong>Recycled Aggregates</strong></li>
                <li><strong>Bamboo</strong></li>
                <li><strong>Earth Bricks</strong></li>
            </ul>
            <p><em>— Pamilerin I. Sanni, Construction Manager</em></p>`
    },
    {
        title: "How AI and IoT Are Revolutionizing Construction Management",
        date: "2026-08-05",
        tags: ["Technology"],
        excerpt: "Learn how digital technologies are transforming project delivery, safety monitoring, and resource optimization.",
        read_time: 6,
        content: `<h4>Introduction</h4>
            <p>AI and IoT are transforming the construction industry.</p>
            <ul>
                <li><strong>Project Scheduling</strong></li>
                <li><strong>Risk Assessment</strong></li>
                <li><strong>Quality Control</strong></li>
                <li><strong>Cost Estimation</strong></li>
            </ul>
            <p><em>— Pamilerin I. Sanni, Construction Manager</em></p>`
    }
];

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function loadBlogPosts() {
    const container = document.getElementById('blogPosts');
    if (!container) return;

    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = blogPosts.map(post => `
        <div class="col-md-6 col-lg-4">
            <div class="blog-card">
                <img src="assets/images/blog1.jpg" alt="${post.title}" onerror="this.src='https://via.placeholder.com/400x200/b8860b/ffffff?text=Blog'">
                <span class="blog-tag">${post.tags[0]}</span>
                <h5>${post.title}</h5>
                <p>${post.excerpt}</p>
                <div class="blog-meta"><i class="fas fa-calendar-alt"></i> ${formatDate(post.date)} · <i class="fas fa-clock"></i> ${post.read_time} min</div>
                <button class="btn-read" onclick="openBlogPost('${post.title.replace(/'/g, "\\'")}')">Read Full Article →</button>
            </div>
        </div>
    `).join('');
}

function openBlogPost(title) {
    const post = blogPosts.find(p => p.title === title);
    if (!post) return;
    const modal = new bootstrap.Modal(document.getElementById('blogModal'));
    document.getElementById('blogModalTitle').textContent = post.title;
    document.getElementById('blogModalBody').innerHTML = `
        <div style="color:#666;font-size:13px;margin-bottom:16px;">
            <i class="fas fa-calendar-alt" style="color:#b8860b;"></i> ${formatDate(post.date)}
            <span class="ms-3"><i class="fas fa-clock" style="color:#b8860b;"></i> ${post.read_time} min read</span>
        </div>
        <div>${post.content}</div>
    `;
    modal.show();
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);