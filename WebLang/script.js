let timerInterval;
let startTime;
let wordCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const writingArea = document.getElementById('writingArea');
    const analyzeButton = document.getElementById('analyzeButton');

    if (writingArea && analyzeButton) {
        writingArea.addEventListener('input', function() {
            wordCount = this.value.split(/\s+/).filter(word => word.length > 0).length;
            document.getElementById('wordCount').textContent = `Words: ${wordCount}`;
        });

        analyzeButton.addEventListener('click', function() {
            const text = writingArea.value;
            if (text.trim().length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please write something before analyzing!',
                });
                return;
            }
            analyzeEssay(text);
        });
    } else {
        console.error('Required elements not found in the DOM.');
    }

    startTimer();
});

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date();
    const diff = now - startTime;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    document.getElementById('timer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

async function analyzeEssay(text) {
    const prompt = encodeURIComponent(`Analyze the following essay and provide feedback on grammar, structure, clarity, and overall quality. Format the feedback in HTML with headings, paragraphs, and bullet points for readability:\n\n${text}`);
    const apiUrl = `https://text.pollinations.ai/prompt/${prompt}`;

    Swal.fire({
        title: 'Analyzing...',
        text: 'Please wait while we analyze your essay.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const analysisResult = await response.text();

        Swal.fire({
            title: 'Essay Analysis',
            html: analysisResult,
            confirmButtonText: 'OK',
        });
    } catch (error) {
        console.error('Error analyzing essay:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while analyzing the essay. Please try again.',
        });
    }
}

// Clear the interval when the page is unloaded
window.addEventListener('beforeunload', function() {
    clearInterval(timerInterval);
});