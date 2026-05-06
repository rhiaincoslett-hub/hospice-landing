// Amount chip ↔ PayFast input wiring
const chips = document.querySelectorAll('.amount-chip');
const amountInput = document.getElementById('PayFastAmount');
const donateBtnAmt = document.querySelector('.donate-btn .amt');

function fmt(n) {
  const num = Number(n);
  if (!isFinite(num)) return '';
  return 'R ' + num.toLocaleString('en-ZA', {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function setAmount(v, fromInput) {
  if (!fromInput) amountInput.value = Number(v).toFixed(2);
  donateBtnAmt.textContent = fmt(amountInput.value);
  chips.forEach(c => {
    c.classList.toggle('active', !fromInput && Number(c.dataset.amount) === Number(v));
  });
}

chips.forEach(c => c.addEventListener('click', () => setAmount(c.dataset.amount, false)));

amountInput.addEventListener('input', () => {
  chips.forEach(c => c.classList.toggle('active', Number(c.dataset.amount) === Number(amountInput.value)));
  donateBtnAmt.textContent = fmt(amountInput.value || 0);
});

setAmount(500, false);

// Frequency toggle (visual only — PayFast _paynow is once-off)
const freqBtns = document.querySelectorAll('.freq-toggle button');
freqBtns.forEach(b => {
  b.addEventListener('click', () => {
    if (b.dataset.freq === 'monthly') {
      b.animate(
        [{ transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }],
        { duration: 220 }
      );
      return;
    }
    freqBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
});

// Smooth scroll for nav anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 76;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
