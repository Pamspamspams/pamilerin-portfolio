/* ============================================================
   MAIN SCRIPT
   ============================================================ */

// SIDEBAR
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

// TIME
function updateTime() {
    const now = new Date();
    document.getElementById('liveTime').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    document.getElementById('liveDate').textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

// WEATHER
async function fetchWeather() {
    try {
        const res = await fetch('https://wttr.in/Lagos,Nigeria?format=%t&lang=en&m');
        const temp = await res.text();
        document.getElementById('liveWeather').innerHTML = temp.trim() || '🌤️ 28°C';
    } catch { document.getElementById('liveWeather').innerHTML = '🌤️ 28°C'; }
}
fetchWeather();
setInterval(fetchWeather, 900000);

// CURRENCIES
async function fetchRates() {
    try {
        const btc = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const btcData = await btc.json();
        document.getElementById('btcRate').textContent = '$' + btcData.bitcoin.usd.toLocaleString();

        const rates = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await rates.json();
        const ngn = data.rates.NGN;
        document.getElementById('usdRate').textContent = '₦' + ngn.toLocaleString();
        document.getElementById('gbpRate').textContent = '₦' + (ngn * data.rates.GBP).toLocaleString();
        document.getElementById('eurRate').textContent = '₦' + (ngn * data.rates.EUR).toLocaleString();
    } catch {
        document.getElementById('btcRate').textContent = '$67,432';
        document.getElementById('usdRate').textContent = '₦1,560';
        document.getElementById('gbpRate').textContent = '₦2,100';
        document.getElementById('eurRate').textContent = '₦1,850';
    }
}
fetchRates();
setInterval(fetchRates, 60000);

// QUOTES SLIDESHOW
let quoteIndex = 0;
const quotes = document.querySelectorAll('.quote-slide');
function showQuote(index) {
    if (!quotes.length) return;
    if (index >= quotes.length) quoteIndex = 0;
    if (index < 0) quoteIndex = quotes.length - 1;
    quotes.forEach(q => q.classList.remove('active'));
    quotes[quoteIndex].classList.add('active');
}
function changeQuote(direction) { quoteIndex += direction; showQuote(quoteIndex); }
setInterval(() => { quoteIndex++; showQuote(quoteIndex); }, 6000);

// CONTACT FORM
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const responseDiv = document.getElementById('formResponse');
        const sendBtn = document.getElementById('sendBtn');
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            responseDiv.className = 'form-response error';
            responseDiv.textContent = '⚠️ Please fill in all required fields.';
            return;
        }

        responseDiv.className = 'form-response loading';
        responseDiv.textContent = '⏳ Sending message...';
        sendBtn.disabled = true;

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', document.getElementById('subject').value.trim() || 'New Inquiry');
            formData.append('message', message);

            const response = await fetch('https://formsubmit.co/ajax/ifelayosannipamilerin@gmail.com', { method: 'POST', body: formData });
            const result = await response.json();

            if (response.ok && result.success !== false) {
                responseDiv.className = 'form-response success';
                responseDiv.textContent = '✅ Thank you! Your message has been sent successfully.';
                this.reset();
            } else { throw new Error('Something went wrong.'); }
        } catch (error) {
            responseDiv.className = 'form-response error';
            responseDiv.textContent = '❌ ' + error.message;
        } finally {
            sendBtn.disabled = false;
        }
    });
});