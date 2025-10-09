// Course data structure
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

// Get current program from URL or default to MBA
function getCurrentProgram() {
    const path = window.location.pathname;
    if (path.includes('bba.html')) return 'BBA';
    if (path.includes('mba.html')) return 'MBA';
    return 'MBA'; // default
}

// Create selector HTML
function createSelectors() {
    const main = document.querySelector('main');
    const program = getCurrentProgram();
    // Initialize semester options
    populateSemesters(program);
    
    // Add event listeners
    setupEventListeners();
}

// Populate semester dropdown
function populateSemesters(program) {
    const semesterSelect = document.getElementById('semester-select');
    const semesters = Object.keys(allCourseData[program]);
    
    let options = '<option value="">Choose Semester</option>';
    semesters.forEach(sem => {
        options += `<option value="${sem}">Semester ${sem}</option>`;
    });
    
    semesterSelect.innerHTML = options;
}

// Setup event listeners for selectors
function setupEventListeners() {
    const semesterSelect = document.getElementById('semester-select');
    const subjectSelect = document.getElementById('subject-select');
    const unitSelect = document.getElementById('unit-select');
    const program = getCurrentProgram();
    
    semesterSelect.addEventListener('change', function() {
        const semester = this.value;
        
        if (semester) {
            populateSubjects(program, semester);
            subjectSelect.disabled = false;
        } else {
            subjectSelect.disabled = true;
            unitSelect.disabled = true;
            subjectSelect.innerHTML = '<option value="">Select Semester First</option>';
            unitSelect.innerHTML = '<option value="">Select Subject First</option>';
            clearCourseContent();
        }
    });
    
    subjectSelect.addEventListener('change', function() {
        const semester = semesterSelect.value;
        const subjectKey = this.value;
        
        if (subjectKey) {
            populateUnits(program, semester, subjectKey);
            unitSelect.disabled = false;
        } else {
            unitSelect.disabled = true;
            unitSelect.innerHTML = '<option value="">Select Subject First</option>';
            clearCourseContent();
        }
    });
    
    unitSelect.addEventListener('change', function() {
        const semester = semesterSelect.value;
        const subjectKey = subjectSelect.value;
        const unitId = this.value;
        
        if (unitId) {
            displayUnitContent(program, semester, subjectKey, unitId);
        } else {
            clearCourseContent();
        }
    });
}

// Populate subject dropdown based on semester
function populateSubjects(program, semester) {
    const subjectSelect = document.getElementById('subject-select');
    const subjects = allCourseData[program][semester];
    
    if (subjects.length === 0) {
        subjectSelect.innerHTML = '<option value="">No subjects available</option>';
        subjectSelect.disabled = true;
        
        // Reset unit selector
        const unitSelect = document.getElementById('unit-select');
        unitSelect.disabled = true;
        unitSelect.innerHTML = '<option value="">Select Subject First</option>';
        clearCourseContent();
        return;
    }
    
    let options = '<option value="">Choose Subject</option>';
    subjects.forEach(subject => {
        options += `<option value="${subject.key}">${subject.title}</option>`;
    });
    
    subjectSelect.innerHTML = options;
    
    // Reset unit selector
    const unitSelect = document.getElementById('unit-select');
    unitSelect.disabled = true;
    unitSelect.innerHTML = '<option value="">Select Subject First</option>';
    clearCourseContent();
}

// Populate unit dropdown based on subject
function populateUnits(program, semester, subjectKey) {
    const unitSelect = document.getElementById('unit-select');
    const subjects = allCourseData[program][semester];
    const subject = subjects.find(s => s.key === subjectKey);
    
    if (!subject || subject.units.length === 0) {
        unitSelect.innerHTML = '<option value="">No units available</option>';
        unitSelect.disabled = true;
        clearCourseContent();
        return;
    }
    
    let options = '<option value="">Choose Unit</option>';
    subject.units.forEach(unit => {
        options += `<option value="${unit.id}">${unit.title}</option>`;
    });
    
    unitSelect.innerHTML = options;
    clearCourseContent();
}


// Function to display unit content
function displayUnitContent(program, semester, subjectKey, unitId) {
    const subjects = allCourseData[program][semester];
    const subject = subjects.find(s => s.key === subjectKey);
    const unit = subject.units.find(u => u.id === unitId);
    
    if (!unit) return;
    
    const iframe = document.getElementById('course-iframe');
    if (iframe) {
        iframe.src = `../content_html/${program}/${semester}/${subjectKey}/${unit.filename}.html`;
        iframe.title = unit.title;
        
        // Update the download path for the download button
        if (window.updateDownloadPath) {
            window.updateDownloadPath(program, semester, subjectKey, unit.filename);
        }
    }
}

// Clear course content display
function clearCourseContent() {
    const iframe = document.getElementById('course-iframe');
    if (iframe) {
        iframe.src = '';
        iframe.title = '';
    }
    
    // Hide download button when content is cleared
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.style.display = 'none';
    }
}

// Listen for messages from iframe to adjust height
window.addEventListener('message', function(event) {
    if (event.data.type === 'resize') {
        const iframe = document.getElementById('course-iframe');
        if (iframe) {
            iframe.style.height = `${event.data.height}px`;
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', createSelectors);

// SCRIPT TO HANDLE THEME TOGGLE FROM PARENT WINDOW
window.addEventListener('message', function(event) {
    // Check if the message source is the parent window's origin for security
    if (event.origin !== window.location.origin) return; 

    // The data is the theme state ('dark' or 'light')
    if (event.data === 'dark') {
        document.body.classList.add('darkmode');
    } else if (event.data === 'light') {
        document.body.classList.remove('darkmode');
    }
}, false);