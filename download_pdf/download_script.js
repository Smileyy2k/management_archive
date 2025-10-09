// ******************************
// COURSE STRUCTURE DATA
// ******************************
// Structure: Program -> Semester -> Subjects -> Units
// Each unit has: id, title, filename (for download link)
const allCourseData = {
    "BBA": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [
            { 
                key: "project_management", 
                title: "Project Management",
                units: [
                    { id: "P1", title: "Unit 1: Introduction to Project Management", filename: "PM_unit_01" },
                    { id: "P2", title: "Unit 2: Project Initiation and Resource Allocation", filename: "PM_unit_02" },
                    { id: "P3", title: "Unit 3: Market Demand Analysis", filename: "PM_unit_03" },
                    { id: "P4", title: "Unit 4: Technical Analysis", filename: "PM_unit_04" },
                    { id: "P5", title: "Unit 5: Financial Projections", filename: "PM_unit_05" },
                    { id: "P6", title: "Unit 6: Appraisal Criteria", filename: "PM_unit_06" },
                    { id: "P7", title: "Unit 7: Risk Analysis in Capital Investment Decisions", filename: "PM_unit_07" },
                    { id: "P8", title: "Unit 8: Environmental Appraisal of Projects", filename: "PM_unit_08" },
                    { id: "P9", title: "Unit 9: Social Cost Benefit Analysis (SCBA)", filename: "PM_unit_09" },
                    { id: "P10", title: "Unit 10: Project Management Processes", filename: "PM_unit_10" },
                    { id: "P11", title: "Unit 11: Future of Project Management", filename: "PM_unit_11" },
                ]
            },
            { 
                key: "market_research", 
                title: "Market Research",
                units: [
                    { id: "M1", title: "Unit 1: Introduction to Market Research", filename: "MR_unit_01" },
                    { id: "M2", title: "Unit 2: Research Proposal and Design", filename: "MR_unit_02" },
                    { id: "M3", title: "Unit 3: Research Process", filename: "MR_unit_03" },
                    { id: "M4", title: "Unit 4: Types of Research", filename: "MR_unit_04" },
                    { id: "M5", title: "Unit 5: Sources and Methods of Collecting Data", filename: "MR_unit_05" },
                    { id: "M6", title: "Unit 6: Survey Research", filename: "MR_unit_06" },
                    { id: "M7", title: "Unit 7: Data Collection Errors", filename: "MR_unit_07" },
                    { id: "M8", title: "Unit 8: Measurement in Market Research", filename: "MR_unit_08" },
                    { id: "M9", title: "Unit 9: Attitude Measurement", filename: "MR_unit_09" },
                    { id: "M10", title: "Unit 10: Observation and Physiological Measures", filename: "MR_unit_10" },
                    { id: "M11", title: "Unit 11: Sampling and Data Analysis", filename: "MR_unit_11" },
                    { id: "M12", title: "Unit 12: Preparation and Tabulation of Data", filename: "MR_unit_12" },
                    { id: "M13", title: "Unit 13: Tests of Significance", filename: "MR_unit_13" },
                    { id: "M14", title: "Unit 14: Bivariate Measures of Association", filename: "MR_unit_14" },
                    { id: "M15", title: "Unit 15: Multivariate Measures of Association", filename: "MR_unit_15" },
                    { id: "M16", title: "Unit 16: Analysis of Variance (ANOVA)", filename: "MR_unit_16" },
                ]
            },
        ],
        "6": [],
    },
    "MBA": {
        "1": [
            {
                key: "marketing_management",
                title: "Marketing Management I",
                units: [
                    { id: "MM1", title: "Unit 1: Marketing Management Concept", filename: "MM_unit_01" },
                    { id: "MM2", title: "Unit 2: Delivering Customer Values and Satisfaction", filename: "MM_unit_02" },
                    { id: "MM3", title: "Unit 3: Marketing Environment", filename: "MM_unit_03" },
                    { id: "MM4", title: "Unit 4: Strategic Planning Process in Marketing", filename: "MM_unit_04" },
                    { id: "MM5", title: "Unit 5: Understanding Consumer Buying Behavior", filename: "MM_unit_05" },
                    { id: "MM6", title: "Unit 6: Organizational Markets And Organizational Buying Behavior", filename: "MM_unit_06" },
                    { id: "MM7", title: "Unit 7: Market Segmentation And Market Targeting", filename: "MM_unit_07" },
                    { id: "MM8", title: "Unit 8: Product Differentiation and Positioning", filename: "MM_unit_08" },
                    { id: "MM9", title: "Unit 9: Marketing And Competitive Strategies", filename: "MM_unit_09" },
                    { id: "MM10", title: "Unit 10: Global Marketing Strategies", filename: "MM_unit_10" },
                    { id: "MM11", title: "Unit 11: Marketing of Services", filename: "MM_unit_11" },
                    { id: "MM12", title: "Unit 12: Marketing of Organizations, Individuals, Places and Ideas", filename: "MM_unit_12" },
                    { id: "MM13", title: "Unit 13: Direct and Online Marketing", filename: "MM_unit_13" },
                    { id: "MM14", title: "Unit 14: Marketing Management: Ethical and Social Dimensions", filename: "MM_unit_14" },
                ]
            },
            {
                key: "organizational_behavior",
                title: "Organizational Behavior",
                units: []
            }
        ],
        "2": [],
        "3": [],
        "4": [],
    }
};
// ******************************


// --- State Variables ---
let currentState = 'PROGRAM'; // 'PROGRAM', 'SEMESTER', 'SUBJECT', 'UNIT_DETAILS'
let currentProgram = null;
let currentSemester = null;
let currentSubjectKey = null;

// --- DOM Elements ---
const contentArea = document.getElementById('dynamic-content-area');
const backButton = document.getElementById('back-button');
const backButtonText = document.getElementById('back-button-text');
const viewTitle = document.getElementById('current-view-title');
const downloadsContainer = document.getElementById('downloads-container');
const globalDownloadBtn = document.getElementById('global-download-all-btn');


// --- Navigation Functions ---

function goBack() {
    if (currentState === 'UNIT_DETAILS') {
        // Units -> Subjects
        currentState = 'SUBJECT';
        currentSubjectKey = null;
        renderSubjects();
    } else if (currentState === 'SUBJECT') {
        // Subjects -> Semesters
        currentState = 'SEMESTER';
        currentSemester = null;
        renderSemesters();
    } else if (currentState === 'SEMESTER') {
        // Semesters -> Programs
        currentState = 'PROGRAM';
        currentProgram = null;
        renderPrograms();
    }
    updateControls();
}

function handleProgramSelect(program) {
    currentProgram = program;
    currentState = 'SEMESTER';
    renderSemesters();
    updateControls();
}

function handleSemesterSelect(semester) {
    currentSemester = semester;
    currentState = 'SUBJECT';
    renderSubjects();
    updateControls();
}

function handleSubjectSelect(subjectKey) {
    currentSubjectKey = subjectKey;
    currentState = 'UNIT_DETAILS';
    renderUnits();
    updateControls();
}

// --- Rendering Functions ---

function updateControls() {
    const controlsHeader = document.querySelector('.controls-header');
    
    // Update Back Button state and text
    if (currentState === 'PROGRAM') {
        backButton.disabled = true;
        backButtonText.textContent = 'Go Back';
        viewTitle.textContent = 'Select Program';
        // Add class to center title when the back button is disabled
        controlsHeader.classList.add('center-mode'); 
        // Hide global download button
        globalDownloadBtn.style.display = 'none'; 
    } else {
        backButton.disabled = false;
        // Remove class to align title to the right/space-between
        controlsHeader.classList.remove('center-mode'); 
        
        if (currentState === 'SEMESTER') {
            backButtonText.textContent = `Back to Programs`;
            viewTitle.textContent = `Select Semester for ${currentProgram}`;
            // Hide global download button
            globalDownloadBtn.style.display = 'none'; 
        } else if (currentState === 'SUBJECT') {
            backButtonText.textContent = `Back to Semesters`;
            viewTitle.textContent = `Select Subject in Sem ${currentSemester}`;
            // Hide global download button
            globalDownloadBtn.style.display = 'none'; 
        } else if (currentState === 'UNIT_DETAILS') {
            const subject = allCourseData[currentProgram][currentSemester].find(s => s.key === currentSubjectKey);
            viewTitle.textContent = subject ? subject.title : 'Download Material';
            backButtonText.textContent = `Back to Subjects`;

            // Show and update global download button
            globalDownloadBtn.style.display = 'flex'; 
            if (subject) {
                const fullZipFileName = `${currentSubjectKey}_${currentProgram}_${currentSemester}.zip`;
                const zipDownloadPath = `${currentProgram}/${currentSemester}/${currentSubjectKey}/${fullZipFileName}`;
                globalDownloadBtn.href = zipDownloadPath;
                globalDownloadBtn.setAttribute('download', fullZipFileName);
            }
        }
    }
}

function renderPrograms() {
    contentArea.innerHTML = '';
    const programs = Object.keys(allCourseData);
    const grid = document.createElement('div');
    grid.className = 'selection-grid';

    programs.forEach(program => {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.textContent = program;
        card.onclick = () => handleProgramSelect(program);
        grid.appendChild(card);
    });

    contentArea.appendChild(grid);
}

function renderSemesters() {
    contentArea.innerHTML = '';
    const semesterData = allCourseData[currentProgram];
    if (!semesterData) return;

    const semesters = Object.keys(semesterData).sort((a, b) => parseInt(a) - parseInt(b));
    const grid = document.createElement('div');
    grid.className = 'selection-grid';

    semesters.forEach(semester => {
        // Only show semesters that actually have content
        const hasContent = semesterData[semester] && semesterData[semester].length > 0;
        if (hasContent) {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.textContent = `Semester ${semester}`;
            card.onclick = () => handleSemesterSelect(semester);
            grid.appendChild(card);
        }
    });

    if (grid.children.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No available semesters with content for this program yet.';
        contentArea.appendChild(message);
    } else {
        contentArea.appendChild(grid);
    }
}

function renderSubjects() {
    contentArea.innerHTML = '';
    const subjects = allCourseData[currentProgram][currentSemester];
    if (!subjects || subjects.length === 0) {
        const message = document.createElement('p');
        message.textContent = `No available subjects for ${currentProgram} Semester ${currentSemester}.`;
        contentArea.appendChild(message);
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'selection-grid';

    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.textContent = subject.title;
        card.onclick = () => handleSubjectSelect(subject.key);
        grid.appendChild(card);
    });

    contentArea.appendChild(grid);
}

function renderUnits() {
    contentArea.innerHTML = '';
    const subject = allCourseData[currentProgram][currentSemester].find(s => s.key === currentSubjectKey);

    if (!subject || !subject.units || subject.units.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No download links available for this subject.';
        contentArea.appendChild(message);
        return;
    }

    const subjectDetails = document.createElement('div');
    subjectDetails.className = 'subject-details';

    const h4 = document.createElement('h4');
    h4.textContent = `${subject.title} - Download Links`;
    subjectDetails.appendChild(h4);

    const unitList = document.createElement('div');
    unitList.className = 'unit-list';

    // 1. Render Unit Download Links
    subject.units.forEach(unit => {
        // Prepend '..' to the path for correct relative linking (assuming PDF files are one level up from this downloads.html page)
        const downloadPath = `${currentProgram}/${currentSemester}/${currentSubjectKey}/${unit.filename}.pdf`;
        const link = document.createElement('a');
        link.href = downloadPath;
        link.className = 'unit-link';
        link.target = '_blank'; // Open PDF in new tab
        link.setAttribute('download', `${unit.filename}.pdf`);
        link.innerHTML = `
            <span>${unit.title}</span>
            <span class="download-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M480-320 280-520l56-56 104 104v-388h80v388l104-104 56 56-200 200ZM240-80q-33 0-56.5-23.5T160-160v-112h80v112h480v-112h80v112q0 33-23.5 56.5T720-80H240Z"/>
                </svg>
            </span>
        `;
        unitList.appendChild(link);
    });

    subjectDetails.appendChild(unitList);
    
    contentArea.appendChild(subjectDetails);
}

// --- Initialization ---

function initDownloads() {
    // Check if required elements exist before attaching listeners
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
    
    // Initial rendering of programs
    renderPrograms();
    updateControls();
    
    // Make container visible after initial render
    if (downloadsContainer) {
        downloadsContainer.classList.add('visible');
    }
}

// Run initialization when the document is ready
document.addEventListener('DOMContentLoaded', initDownloads);
