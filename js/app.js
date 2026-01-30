const folderIcon = document.getElementById("folderIcon");
const folderWindow = document.getElementById("folderWindow");
const contentWindow = document.getElementById("contentWindow");
const contentBody = document.getElementById("contentBody");
const contentTitle = document.getElementById("contentTitle");
const contentIcon = document.getElementById("contentIcon");
const clock = document.getElementById("clock");
const taskbarButtons = document.querySelectorAll("[data-open]");

const windows = [folderWindow, contentWindow];

const fileData = {
  details: {
    title: "My Details",
    icon: "🧾",
    html: `
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar">NK</div>
          <div>
            <h2>Nandu Kumar Koribilli</h2>
            <p>AI/ML-focused Computer Science Undergraduate</p>
            <div class="info-badges">
              <span class="badge">Visakhapatnam, India</span>
              <span class="badge">Open to AI/ML Internships</span>
              <span class="badge">Python • ML • Data</span>
            </div>
          </div>
        </div>
        <p>
          Hands-on experience building end-to-end ML solutions, from data preprocessing to
          deployment. Passionate about AI-driven healthcare and agriculture applications.
        </p>
        <div>
          <div class="section-title">Contact</div>
          <div class="list">
            <div>📞 +91-9390735608</div>
            <div>✉️ nandukumar9980@gmail.com</div>
            <div>🔗 <a class="link" href="https://www.linkedin.com/in/nandukumar-koribilli" target="_blank" rel="noreferrer">LinkedIn</a></div>
            <div>💻 <a class="link" href="https://github.com/Nandukumar-koribilli" target="_blank" rel="noreferrer">GitHub</a></div>
          </div>
        </div>
        <div>
          <div class="section-title">Technical Skills</div>
          <div class="list">
            <div>Python (NumPy, Pandas, Matplotlib, Seaborn)</div>
            <div>Machine Learning: Regression, Classification, Feature Engineering</div>
            <div>Scikit-learn, TensorFlow (basics), Flask</div>
            <div>Docker, Git, GitHub, Jupyter Notebook, Linux</div>
          </div>
        </div>
        <div>
          <div class="section-title">Education</div>
          <div class="list">
            <div>GVP Visakhapatnam — B.Sc Computer Science (Minor: IoT), 2023–2026</div>
            <div>CIPRA Junior College — Intermediate (MPC), 2022–2023</div>
            <div>Sri Satya ITC — ITI (Electrician), 2020–2022</div>
            <div>ZP High School — 10th Grade, 2019–2020</div>
          </div>
        </div>
      </div>
    `,
  },
  projects: {
    title: "My Projects",
    icon: "💻",
    html: `
      <div class="profile-card">
        <div>
          <div class="section-title">Featured Projects</div>
          <div class="project-card">
            <h4>CardiAI - ECG Arrhythmia Analyzer</h4>
            <div class="project-meta">Python • Streamlit • Gemini 2.5 Pro • Plotly</div>
            <p>
              Built a Streamlit app to classify multi-label ECG arrhythmias with AI-assisted clinical
              insights, batch processing, and interactive dashboards.
            </p>
          </div>
          <div class="project-card">
            <h4>Crop Yield Predictor</h4>
            <div class="project-meta">Python • Scikit-learn • Flask</div>
            <p>
              Engineered an end-to-end crop yield prediction pipeline using environmental data and
              deployed the model via a Flask web interface.
            </p>
          </div>
        </div>
        <div>
          <div class="section-title">Experience</div>
          <div class="list">
            <div>GeeksforGeeks Bootcamp — Data Science Trainee (2023)</div>
            <div>ML lifecycle: data collection, preprocessing, training, evaluation</div>
          </div>
        </div>
        <div>
          <div class="section-title">Leadership & Hackathons</div>
          <div class="list">
            <div>TECOS (GVP Technical Club) — Technical Lead (2024–Present)</div>
            <div>Participated in 5+ hackathons building AI-driven prototypes</div>
          </div>
        </div>
        <div>
          <div class="section-title">Certifications</div>
          <div class="list">
            <div>Artificial Intelligence — Google Developers</div>
            <div>Python Certification — Google Developers</div>
            <div>Data Science Bootcamp — GeeksforGeeks</div>
            <div>IoT — Curtin University (edX)</div>
            <div>E-Commerce Team Lead — Infosys Foundation</div>
          </div>
        </div>
      </div>
    `,
  },
};

const openSound = () => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const now = context.currentTime;
  const frequencies = [523.25, 659.25, 783.99];

  frequencies.forEach((freq, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + index * 0.05);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(now + index * 0.02);
    osc.stop(now + 0.6 + index * 0.05);
  });
};

const bringToFront = (target) => {
  windows.forEach((windowEl, index) => {
    if (windowEl === target) {
      windowEl.style.zIndex = 3 + index + 1;
    }
  });
};

const openWindow = (windowEl) => {
  windowEl.classList.add("is-open");
  windowEl.setAttribute("aria-hidden", "false");
  bringToFront(windowEl);
  openSound();
};

const closeWindow = (windowEl) => {
  windowEl.classList.remove("is-open");
  windowEl.setAttribute("aria-hidden", "true");
};

folderIcon.addEventListener("click", () => openWindow(folderWindow));

taskbarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.open;
    const targetWindow = document.getElementById(targetId);
    if (targetWindow) {
      openWindow(targetWindow);
    }
  });
});

folderWindow.addEventListener("click", (event) => {
  const button = event.target.closest(".file-tile");
  if (!button || button.tagName === "A") return;
  const fileKey = button.dataset.file;
  const file = fileData[fileKey];
  if (!file) return;
  contentTitle.textContent = file.title;
  contentIcon.textContent = file.icon;
  contentBody.innerHTML = file.html;
  openWindow(contentWindow);
});

windows.forEach((windowEl) => {
  windowEl.addEventListener("click", () => bringToFront(windowEl));
  windowEl.querySelectorAll(".window-action").forEach((actionBtn) => {
    actionBtn.addEventListener("click", () => {
      const action = actionBtn.dataset.action;
      if (action === "close") {
        closeWindow(windowEl);
      }
      if (action === "minimize") {
        windowEl.classList.remove("is-open");
      }
    });
  });
});

const updateClock = () => {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    month: "short",
    day: "2-digit",
  });
  clock.textContent = `${date} • ${time}`;
};

updateClock();
setInterval(updateClock, 1000 * 30);
