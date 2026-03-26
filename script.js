/**
 * APP LOGIC: PATHFINDER
 */

// 1. Data Structure for Questions
const quizData = [
    {
        question: "What is your primary goal after college?",
        options: [
            { text: "I want to specialize and study more (Masters/Ph.D.)", value: "studies" },
            { text: "I want to start earning and get a job immediately", value: "job" },
            { text: "I want to build my own business or startup", value: "entrepreneur" }
        ]
    },
    {
        question: "Which field interests you the most?",
        options: [
            { text: "Technology, Coding & AI", value: "tech" },
            { text: "Management, Finance & Business", value: "business" },
            { text: "Creative Arts, Design & Media", value: "creative" }
        ]
    }
];

// 2. Roadmap Database (The "Big" Content)
const roadmaps = {
    "studies-tech": [
        { title: "Entrance Exams", desc: "Start preparing for GATE (India) or GRE/TOEFL (Abroad). Focus on advanced DSA and OS." },
        { title: "Specialization", desc: "Choose a niche: Artificial Intelligence, Cyber Security, or Data Science for your Master's." },
        { title: "Research Projects", desc: "Publish at least one research paper or build a complex open-source project." },
        { title: "Application Phase", desc: "Apply to Top Tier Universities (IITs, NITs, or Ivy Leagues) during your final year." }
    ],
    "job-tech": [
        { title: "Core Skills", desc: "Master MERN stack or Python/Django. Build 3 production-grade applications." },
        { title: "Internship Hunt", desc: "Apply for 6-month internships at tech startups to gain real-world experience." },
        { title: "Placement Prep", desc: "Solve 200+ LeetCode problems and practice System Design concepts." },
        { title: "Final Landing", desc: "Apply for SDE-1 roles at Product MNCs or high-growth fintech companies." }
    ],
    "entrepreneur-tech": [
        { title: "Problem Definition", desc: "Identify a scalable problem in the tech industry that needs solving." },
        { title: "MVP Development", desc: "Build a Minimum Viable Product (MVP) using low-code or specialized tech." },
        { title: "Incubation", desc: "Join your college E-Cell or a startup accelerator like Y-Combinator." },
        { title: "Funding & Launch", desc: "Pitch to Angel Investors and launch your beta version to early users." }
    ],
    "business-studies": [
        { title: "CAT/GMAT Prep", desc: "Start rigorous coaching for CAT or GMAT. Focus on Quantitative and Verbal ability." },
        { title: "Profile Building", desc: "Participate in case study competitions and national level management fests." },
        { title: "B-School Admission", desc: "Aim for IIMs, XLRI, or Global Business Schools for an MBA." }
    ]
    // Note: You can add more combinations like 'creative-job' or 'business-job' here.
};

// 3. App State
let currentStep = 0;
let answers = [];

/**
 * Switch between UI views
 */
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    if(viewId === 'quiz') loadQuestion();
}

/**
 * Render the current question
 */
function loadQuestion() {
    const q = quizData[currentStep];
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    // Update Progress
    progressBar.style.width = `${((currentStep) / quizData.length) * 100}%`;

    questionText.innerText = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt.text;
        btn.onclick = () => handleAnswer(opt.value);
        optionsContainer.appendChild(btn);
    });
}

/**
 * Process answer and navigate
 */
function handleAnswer(val) {
    answers.push(val);
    currentStep++;

    if (currentStep < quizData.length) {
        loadQuestion();
    } else {
        generateRoadmap();
    }
}

/**
 * Generate the final Roadmap
 */
function generateRoadmap() {
    showView('results');
    const display = document.getElementById('roadmap-display');
    
    // Combine answers to find the roadmap key (e.g., "studies-tech")
    // We reverse the answers array logic to match the roadmap keys
    const key = `${answers[0]}-${answers[1]}`;
    const steps = roadmaps[key] || roadmaps["job-tech"]; // Fallback if combination not defined

    display.innerHTML = ""; // Clear

    steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.classList.add('roadmap-step');
        stepEl.innerHTML = `
            <div class="step-number">Phase 0${index + 1}</div>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
        `;
        display.appendChild(stepEl);
    });
}