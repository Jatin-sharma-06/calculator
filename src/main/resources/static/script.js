const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const opEl = document.getElementById('op');
const btn = document.getElementById('btn');
const out = document.getElementById('out');
const status = document.getElementById('status');

function showResult(value) {
    out.innerHTML = `<div class="result">Result: ${value}</div>`;
}

function showError(message) {
    out.innerHTML = `<div class="error">${message}</div>`;
}

function setLoading(on) {
    btn.disabled = on;
    btn.textContent = on ? 'Calculating...' : 'Calculate';
}

btn.addEventListener('click', async () => {
    out.innerHTML = '';
    const num1 = num1El.value;
    const num2 = num2El.value;
    const operation = opEl.value;

    // basic validation
    if (num1 === '' || num2 === '') {
        showError('Please provide both numbers.');
        return;
    }

    const payload = {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operation: operation
    };

    setLoading(true);
    status.textContent = 'Calling server...';

    try {
        const res = await fetch('/api/calculator/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // handle non-2xx
        if (!res.ok) {
            let text;
            try { text = await res.text(); }
            catch (e) { text = res.statusText; }
            throw new Error(text || `Server returned ${res.status}`);
        }

        // server returns a raw number (e.g. 15.0)
        const text = await res.text();
        showResult(text);
        status.textContent = 'Done';
    } catch (err) {
        showError(err.message || 'Request failed.');
        status.textContent = 'Error';
    } finally {
        setLoading(false);
    }
});

// allow pressing Enter in inputs to trigger
[num1El, num2El].forEach(el => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
});
