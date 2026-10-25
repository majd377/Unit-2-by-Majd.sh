// Tab Switcher Function
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Interactive Grammar Simulator Logic
function runGrammarSim() {
    const val = document.getElementById('grammar-sim-select').value;
    const output = document.getElementById('grammar-sim-output');

    if (val === "1") {
        output.innerHTML = `
            <strong>الواقع الحقيقي (Fact):</strong> I don't understand this question.<br>
            <strong>صيغة التمني (Wish Sentence):</strong> <span style="color:var(--latte-medium); font-weight:bold;">I wish I understood this question.</span><br>
            <strong>شرح القاعدة من الكتاب:</strong> نستخدم <code>wish + Past Simple</code> لتمني تغيير واقع حالي.
        `;
    } else if (val === "2") {
        output.innerHTML = `
            <strong>الواقع الحقيقي (Fact):</strong> Our school doesn't have better equipment.<br>
            <strong>صيغة التمني (Wish Sentence):</strong> <span style="color:var(--latte-medium); font-weight:bold;">I wish our school had better equipment.</span><br>
            <strong>شرح القاعدة من الكتاب:</strong> تم تحويل الفعل إلى الماضي البسيط (had) للتعبير عن رغبة في تغيير حالة قائمة الآن.
        `;
    } else if (val === "3") {
        output.innerHTML = `
            <strong>الطموح والهدف (Ambition):</strong> Education Ministers want to improve school systems.<br>
            <strong>صيغة الرجاء (Hope Sentence):</strong> <span style="color:var(--latte-medium); font-weight:bold;">Education Ministers are hoping to improve their school systems.</span><br>
            <strong>شرح القاعدة من الكتاب:</strong> نستخدم <code>hope + to + infinitive</code> للحديث عن الأهداف والطموحات (aims / ambitions).
        `;
    } else if (val === "4") {
        output.innerHTML = `
            <strong>الأمنية المستقبلية (Future Want):</strong> I want it not to rain tomorrow.<br>
            <strong>صيغة الرجاء (Hope Sentence):</strong> <span style="color:var(--latte-medium); font-weight:bold;">I hope it doesn't rain tomorrow. / I hope it won't rain tomorrow.</span><br>
            <strong>شرح القاعدة من الكتاب:</strong> نستخدم <code>hope + subject + verb</code>، حيث يكون الفعل إما بالمضارع البسيط (doesn't rain) أو صيغة المستقبل (won't rain).
        `;
    }
}

// Export a printable copy so html2canvas captures every line in the form fields.
async function exportCVAsImage() {
    const cvElement = document.getElementById('cv-to-export');
    const downloadButton = document.querySelector('.btn-download-cv');

    if (!cvElement || typeof html2canvas === 'undefined') {
        alert('تعذر تجهيز الصورة. حدّث الصفحة وحاول مرة أخرى.');
        return;
    }

    const exportCopy = cvElement.cloneNode(true);
    exportCopy.removeAttribute('id');
    exportCopy.classList.add('cv-export-copy');

    exportCopy.querySelectorAll('input, textarea').forEach(field => {
        const text = document.createElement('div');
        text.className = 'cv-export-value';
        text.textContent = field.value.trim() || field.placeholder || '';
        text.style.cssText = [
            'width: 100%',
            'min-height: 42px',
            'margin-bottom: 10px',
            'padding: 10px',
            'border: 1px solid #E6D5C3',
            'border-radius: 8px',
            'background: #FAF6F0',
            'color: #2C1810',
            'font: inherit',
            'white-space: pre-wrap',
            'overflow-wrap: anywhere'
        ].join(';');

        if (field.tagName === 'TEXTAREA') {
            text.style.minHeight = '80px';
        }
        if (field.id === 'cv-name') {
            text.style.fontSize = '1.4rem';
            text.style.fontWeight = '800';
            text.style.color = '#5C3D2E';
        }

        field.replaceWith(text);
    });

    Object.assign(exportCopy.style, {
        position: 'fixed',
        left: '-10000px',
        top: '0',
        width: `${cvElement.getBoundingClientRect().width}px`,
        height: 'auto',
        maxHeight: 'none',
        overflow: 'visible',
        transform: 'none',
        animation: 'none'
    });
    document.body.appendChild(exportCopy);

    if (downloadButton) downloadButton.disabled = true;

    try {
        const canvas = await html2canvas(exportCopy, {
            scale: 2,
            backgroundColor: '#FFFFFF',
            windowWidth: Math.max(document.documentElement.clientWidth, exportCopy.scrollWidth),
            windowHeight: Math.max(document.documentElement.clientHeight, exportCopy.scrollHeight),
            scrollY: 0
        });

        const link = document.createElement('a');
        link.download = 'My_CV_Grade11.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('CV image export failed:', error);
        alert('تعذر تنزيل الصورة. حاول مرة أخرى.');
    } finally {
        exportCopy.remove();
        if (downloadButton) downloadButton.disabled = false;
    }
}

// Quiz Practice Checker
function checkAnswer(btn, isCorrect, qId) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('.opt-btn');
    
    buttons.forEach(b => {
        b.disabled = true;
        b.style.cursor = 'default';
    });

    if (isCorrect) {
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
            if (b.getAttribute('onclick').includes('true')) {
                b.classList.add('correct');
            }
        });
    }

    const explain = document.getElementById(qId + '-explain');
    if (explain) {
        explain.style.display = 'block';
    }
}
