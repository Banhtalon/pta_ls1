// =====================================================================
// PRACTICE.JS - Logic phần thực hành code Python
// Render bài tập, code editor, chạy Python bằng Pyodide, chấm kết quả
// =====================================================================

// ---------------------------------------------------------------------
// BIẾN TOÀN CỤC cho phần Practice
// ---------------------------------------------------------------------

let currentPracticeData = [];
let currentPracticeLessonKey = '';
let currentExerciseIndex = -1;
let completedExercises = {};
let codeEditorInstance = null;

/**
 * Reset trạng thái bài tập thực hành hiện tại
 */
function cleanupPractice() {
  currentPracticeData = [];
  currentPracticeLessonKey = '';
  currentExerciseIndex = -1;
  completedExercises = {};
  if (codeEditorInstance) {
    codeEditorInstance.toTextArea();
    codeEditorInstance = null;
  }
}

// =====================================================================
// TÍNH NĂNG: RENDER DANH SÁCH BÀI TẬP (SIDEBAR)
// =====================================================================

function renderPracticeList() {
  const container = document.getElementById('practice-list-container');
  if (!container) return;
  let html = '';

  for (let i = 0; i < currentPracticeData.length; i++) {
    const exercise = currentPracticeData[i];
    const isUnlocked = true;
    const isCompleted = completedExercises[exercise.id];
    const isActive = (i === currentExerciseIndex);

    let icon = '🔒';
    if (isCompleted) {
      icon = '✅';
    } else if (isUnlocked) {
      icon = '📝';
    }

    let classNames = 'practice-item';
    if (isActive) classNames += ' active';
    if (!isUnlocked) classNames += ' locked';
    if (isCompleted) classNames += ' completed';

    let difficultyClass = 'easy';
    if (exercise.difficulty === 'Trung bình') difficultyClass = 'medium';
    if (exercise.difficulty === 'Khó') difficultyClass = 'hard';

    html += `
      <div class="${classNames}"
           id="practice-item-${exercise.id}"
           onclick="selectExercise(${i})"
           data-unlocked="${isUnlocked}">
        <span class="practice-item-icon">${icon}</span>
        <div class="practice-item-info">
          <div class="practice-item-name">${i + 1}. ${exercise.title}</div>
          <div class="practice-item-difficulty ${difficultyClass}">
            ${exercise.difficulty}
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// =====================================================================
// TÍNH NĂNG: CHỌN BÀI TẬP
// =====================================================================

function selectExercise(index) {
  const exercise = currentPracticeData[index];
  currentExerciseIndex = index;

  renderPracticeList();

  const elTitle = document.getElementById('practice-title');
  if (elTitle) elTitle.textContent = `Bài ${index + 1}: ${exercise.title}`;

  const badge = document.getElementById('practice-difficulty');
  if (badge) {
    badge.textContent = exercise.difficulty;
    badge.className = 'difficulty-badge';
    if (exercise.difficulty === 'Dễ') badge.classList.add('easy');
    else if (exercise.difficulty === 'Trung bình') badge.classList.add('medium');
    else badge.classList.add('hard');
  }

  const elDesc = document.getElementById('practice-description');
  if (elDesc) elDesc.textContent = exercise.description;

  const hintsSection = document.getElementById('hints-section');
  if (hintsSection) hintsSection.style.display = 'block';

  const hintsContent = document.getElementById('hints-content');
  if (hintsContent) {
    let hintsHtml = '';
    for (let i = 0; i < exercise.hints.length; i++) {
      hintsHtml += `
        <div class="hint-step">
          <span class="hint-step-number">${i + 1}</span>
          <span class="hint-step-text">${exercise.hints[i]}</span>
        </div>
      `;
    }
    let sampleHtml = '';
    let rightColInner = '';
    
    if (exercise.illustration) {
        rightColInner += `
          <div style="font-size: 18px; font-weight: 800; color: #10757d; margin-bottom: 16px; text-transform: uppercase;">Minh họa:</div>
          <img src="${exercise.illustration}" style="max-width:100%; border-radius:8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
        `;
    }

    if (exercise.testCases && exercise.testCases.length > 0) {
      const tc = exercise.testCases[0];
      rightColInner += `
          <div style="font-size: 18px; font-weight: 800; color: #10757d; margin-bottom: 16px; text-transform: uppercase;">Ví dụ mẫu:</div>
      `;
      if (tc.input) {
         rightColInner += `
            <div style="display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e8b57" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              Nhập (Input):
            </div>
            <pre style="margin: 0 0 20px 0; background: #fff; padding: 12px 16px; border-radius: 6px; font-family: monospace; color: #2e8b57; font-size: 14px; white-space: pre-wrap; box-shadow: 0 2px 6px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">${SafeDOM.escapeHTML(tc.input)}</pre>
         `;
      }
      rightColInner += `
          <div style="display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2980b9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            In ra (Output):
          </div>
          <pre style="margin: 0; background: #fff; padding: 12px 16px; border-radius: 6px; font-family: monospace; color: #2980b9; font-size: 14px; white-space: pre-wrap; box-shadow: 0 2px 6px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">${SafeDOM.escapeHTML(tc.expectedOutput)}</pre>
      `;
    }

    if (rightColInner) {
      sampleHtml = `<div class="hints-col-right">${rightColInner}</div>`;
    } else {
      sampleHtml = `<div class="hints-col-right" style="display: none;"></div>`;
    }
    hintsContent.style.display = '';
    hintsContent.innerHTML = `
      <div class="hints-layout">
        <div class="hints-col-left">
          ${hintsHtml}
        </div>
        ${sampleHtml}
      </div>
    `;
    // We will control visibility using CSS classes for animation instead of inline styles
    hintsContent.classList.remove('open');
  }
  
  const btnHints = document.getElementById('btn-hints-toggle');
  if (btnHints) btnHints.classList.remove('open');

  const editorSection = document.getElementById('code-editor-section');
  if (editorSection) editorSection.style.display = 'block';

  const savedCode = localStorage.getItem(`pylearn_${currentPracticeLessonKey}_code_${exercise.id}`);
  
  if (codeEditorInstance) {
    // If CodeMirror is initialized, set its value
    codeEditorInstance.setValue(savedCode || exercise.starterCode);
    codeEditorInstance.setOption("readOnly", false);
    // Refresh to ensure it renders correctly if it was hidden
    setTimeout(() => codeEditorInstance.refresh(), 10);
  } else {
    // Fallback if not initialized yet
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor) {
      codeEditor.value = savedCode || exercise.starterCode;
      codeEditor.disabled = false;
    }
  }

  updateLineNumbers();

  const resultsSection = document.getElementById('results-section');
  if (resultsSection) resultsSection.style.display = 'none';
}

// =====================================================================
// TÍNH NĂNG: CODE EDITOR
// =====================================================================

function updateLineNumbers() {
  // Do nothing, CodeMirror handles line numbers automatically
}

function saveCurrentCode() {
  if (currentExerciseIndex < 0) return;
  const exercise = currentPracticeData[currentExerciseIndex];
  if (codeEditorInstance) {
    localStorage.setItem(`pylearn_${currentPracticeLessonKey}_code_${exercise.id}`, codeEditorInstance.getValue());
  }
}

function initCodeEditor() {
  const codeEditorEl = document.getElementById('code-editor');
  if (!codeEditorEl) return;

  // Initialize CodeMirror if not already initialized
  if (!codeEditorInstance) {
    codeEditorInstance = CodeMirror.fromTextArea(codeEditorEl, {
      mode: "python",
      theme: "monokai",
      lineNumbers: true,
      autoCloseBrackets: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      extraKeys: {
        "Tab": (cm) => cm.execCommand("insertSoftTab") // Use spaces for Tab
      }
    });

    // Save code when user types
    codeEditorInstance.on('change', () => {
      saveCurrentCode();
    });
  }
}

// =====================================================================
// TÍNH NĂNG: GỢI Ý (TOGGLE)
// =====================================================================

function initHintsToggle() {
  const btn = document.getElementById('btn-hints-toggle');
  if (!btn) return;
  // Xóa event listener cũ nếu có (bằng cách clone) để tránh lặp
  const cloneBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(cloneBtn, btn);
  
  cloneBtn.addEventListener('click', () => {
    const content = document.getElementById('hints-content');
    if (!content) return;
    const isOpen = content.classList.contains('open');
    if (isOpen) {
      content.classList.remove('open');
      cloneBtn.classList.remove('open');
    } else {
      content.classList.add('open');
      cloneBtn.classList.add('open');
    }
  });
}

// =====================================================================
// TÍNH NĂNG: CHẠY CODE PYTHON VÀ CHẤM BÀI
// =====================================================================

async function runAndCheckCode() {
  if (!window.pythonRunner) {
    alert('⏱ Hệ thống đang khởi tạo Python. Vui lòng đợi vài giây rồi thử lại.');
    return;
  }
  if (currentExerciseIndex < 0) return;

  const exercise = currentPracticeData[currentExerciseIndex];
  if (!codeEditorInstance) return;
  const userCode = codeEditorInstance.getValue();

  if (userCode.trim() === '' || userCode.trim() === exercise.starterCode.trim()) {
    alert('📝 Bạn chưa viết code! Hãy viết code rồi bấm Kiểm tra.');
    return;
  }

  const btnRun = document.getElementById('btn-run-code');
  if (btnRun) {
    btnRun.disabled = true;
    btnRun.textContent = '⏳ Đang chạy...';
  }

  const results = [];
  for (let i = 0; i < exercise.testCases.length; i++) {
    const testCase = exercise.testCases[i];
    const result = await runSingleTestCase(userCode, testCase);
    results.push(result);
  }

  displayResults(results, exercise);

  if (btnRun) {
    btnRun.disabled = false;
    btnRun.textContent = '▶ Kiểm tra';
  }
}

async function runSingleTestCase(userCode, testCase) {
  try {
    const inputData = testCase.input || '';
    
    const { output, error } = await window.pythonRunner.runCode(userCode, inputData);
    
    if (error) {
      throw new Error(error);
    }
    
    const actual = String(output).trim();
    const expected = testCase.expectedOutput.trim();
    const passed = actual === expected;
    
    return { passed, actualOutput: actual, expectedOutput: expected, error: null, testCase };
  } catch (error) {
    let errorMsg = error.message || String(error);
    const lines = errorMsg.split('\n');
    const pythonError = lines.filter(l => l.trim() && !l.startsWith('  File')).pop() || errorMsg;

    return { passed: false, actualOutput: '', expectedOutput: testCase.expectedOutput.trim(), error: pythonError, testCase };
  }
}

function displayResults(results, exercise) {
  const container = document.getElementById('results-container');
  const section = document.getElementById('results-section');
  if (!container || !section) return;
  
  section.style.display = 'block';
  container.innerHTML = ''; // Clear old results

  let allPassed = true;

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (!r.passed) allPassed = false;
    
    const statusIcon = r.passed ? '✅' : '❌';
    const statusClass = r.passed ? 'pass' : 'fail';
    
    const resultDiv = document.createElement('div');
    resultDiv.className = `test-case-result ${statusClass}`;
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'test-case-icon';
    iconSpan.textContent = statusIcon;
    resultDiv.appendChild(iconSpan);
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'test-case-info';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'test-case-name';
    nameDiv.textContent = r.testCase.description;
    infoDiv.appendChild(nameDiv);
    
    const detailDiv = document.createElement('div');
    detailDiv.className = 'test-case-detail';
    
    if (r.testCase.input) {
      const inputDiv = document.createElement('div');
      inputDiv.textContent = '📥 Input: ';
      const inputCode = document.createElement('code');
      inputCode.textContent = r.testCase.input.replace(/\n/g, ', ');
      inputDiv.appendChild(inputCode);
      detailDiv.appendChild(inputDiv);
    }
    
    const expectedDiv = document.createElement('div');
    expectedDiv.textContent = '🎯 Kết quả mong đợi: ';
    const expectedCode = document.createElement('code');
    expectedCode.textContent = r.expectedOutput;
    expectedDiv.appendChild(expectedCode);
    detailDiv.appendChild(expectedDiv);
    
    const actualDiv = document.createElement('div');
    actualDiv.textContent = '📤 Kết quả của bạn: ';
    const actualCode = document.createElement('code');
    actualCode.textContent = r.error ? '🚨 Lỗi: ' + r.error.split('\n').pop() : (r.actualOutput || '(không có output)');
    actualDiv.appendChild(actualCode);
    detailDiv.appendChild(actualDiv);
    
    infoDiv.appendChild(detailDiv);
    resultDiv.appendChild(infoDiv);
    container.appendChild(resultDiv);
  }

  const passCount = results.filter(r => r.passed).length;
  const totalCount = results.length;

  const summaryDiv = document.createElement('div');
  if (allPassed) {
    summaryDiv.className = 'results-summary all-pass';
    summaryDiv.textContent = `🎉 Tuyệt vời! Bạn đã vượt qua tất cả ${totalCount} test cases!`;
    completedExercises[exercise.id] = true;
    savePracticeProgress();
    renderPracticeList();
  } else {
    summaryDiv.className = 'results-summary has-fail';
    summaryDiv.textContent = `💡 Đạt ${passCount}/${totalCount} test cases. Hãy kiểm tra lại code và thử lại!`;
  }
  container.appendChild(summaryDiv);

  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// =====================================================================
// TÍNH NĂNG: LƯU VÀ KHÔI PHỤC TIẾN TRÌNH THỰC HÀNH
// =====================================================================

function savePracticeProgress() {
  localStorage.setItem(`pylearn_${currentPracticeLessonKey}_practice_completed`, JSON.stringify(completedExercises));

  // Đồng bộ kết quả lên Firebase (nếu đã đăng nhập)
  if (typeof syncPracticeResultToFirebase === 'function') {
    syncPracticeResultToFirebase(currentPracticeLessonKey, completedExercises);
  }
}

function loadPracticeProgress() {
  const saved = localStorage.getItem(`pylearn_${currentPracticeLessonKey}_practice_completed`);
  if (saved) {
    completedExercises = JSON.parse(saved);
  }
}

// =====================================================================
// KHỞI TẠO PRACTICE
// =====================================================================

function initPractice(practiceData, lessonKey) {
  currentPracticeData = practiceData;
  currentPracticeLessonKey = lessonKey;
  
  loadPracticeProgress();
  renderPracticeList();
  initCodeEditor();
  initHintsToggle();
  
  const btnRun = document.getElementById('btn-run-code');
  if (btnRun) {
    // Tránh duplicate listener
    const clone = btnRun.cloneNode(true);
    btnRun.parentNode.replaceChild(clone, btnRun);
    clone.addEventListener('click', runAndCheckCode);
  }
}
