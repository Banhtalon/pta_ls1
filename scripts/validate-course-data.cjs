const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('Validating course data...');

// Load COURSE_STRUCTURE
const courseStructurePath = path.join(__dirname, '../js/data/course-structure.js');
let courseStructureCode = fs.readFileSync(courseStructurePath, 'utf8');
courseStructureCode = courseStructureCode.replace('const COURSE_STRUCTURE =', 'var COURSE_STRUCTURE =');
const context = vm.createContext({ window: {} });
vm.runInContext(courseStructureCode, context);
const COURSE_STRUCTURE = context.COURSE_STRUCTURE;

if (!COURSE_STRUCTURE) {
  console.error('\x1b[31mError: COURSE_STRUCTURE not found in js/data/course-structure.js\x1b[0m');
  process.exit(1);
}

let hasError = false;

function reportError(file, message) {
  console.error(`\x1b[31m[ERROR] ${file}: ${message}\x1b[0m`);
  hasError = true;
}

// Validate Structure
for (const [levelId, levelData] of Object.entries(COURSE_STRUCTURE)) {
  if (levelData.id !== levelId) {
    reportError('course-structure.js', `Level ID mismatch: ${levelId} vs ${levelData.id}`);
  }

  const lessons = levelData.lessons;
  for (const lesson of lessons) {
    const allQuizIds = new Set();
    const allPracticeIds = new Set();
    
    if (!lesson.id || !lesson.title || !lesson.description || !lesson.status || lesson.contentVersion === undefined) {
      // In Phase 1, status and contentVersion might not be present yet until Phase 2 is done.
      // We will allow missing them IF they are literally missing right now, but the test demands them.
      // Wait, if it demands them, we will add them in Phase 2. The validator runs after Phase 2 in CI.
      if (!lesson.status || lesson.contentVersion === undefined) {
          reportError('course-structure.js', `Lesson ${levelId}_${lesson.id} is missing 'status' or 'contentVersion'`);
      }
    }

    const lessonKey = `${levelId}_${lesson.id}`;
    const lessonFileName = `lesson-${lesson.id}.js`;
    const lessonFilePath = path.join(__dirname, `../js/data/${levelId}/${lessonFileName}`);

    if (lesson.status === 'published') {
      if (!fs.existsSync(lessonFilePath)) {
        reportError(`js/data/${levelId}/${lessonFileName}`, `Published lesson missing file: ${lessonKey}`);
        continue;
      }

      // Load lesson data
      const lessonCode = fs.readFileSync(lessonFilePath, 'utf8');
      vm.runInContext(lessonCode, context);
      const LESSON_DATA = context.window.LESSON_DATA;

      if (!LESSON_DATA || !LESSON_DATA[lessonKey]) {
        reportError(`js/data/${levelId}/${lessonFileName}`, `window.LESSON_DATA['${lessonKey}'] is missing`);
        continue;
      }

      const lessonContent = LESSON_DATA[lessonKey];

      // Validate Quiz
      if (!lessonContent.quizData || lessonContent.quizData.length === 0) {
        reportError(`js/data/${levelId}/${lessonFileName}`, `Published lesson must have at least one quiz`);
      } else {
        lessonContent.quizData.forEach(quiz => {
          if (allQuizIds.has(quiz.id)) {
            reportError(`js/data/${levelId}/${lessonFileName}`, `Duplicate quiz ID: ${quiz.id}`);
          }
          allQuizIds.add(quiz.id);

          if (quiz.correctAnswer < 0 || quiz.correctAnswer >= quiz.options.length) {
            reportError(`js/data/${levelId}/${lessonFileName}`, `correctAnswer out of bounds for quiz ID ${quiz.id}`);
          }
        });
      }

      // Validate Practice
      if (!lessonContent.practiceData || lessonContent.practiceData.length === 0) {
        reportError(`js/data/${levelId}/${lessonFileName}`, `Published lesson must have at least one practice`);
      } else {
        lessonContent.practiceData.forEach(practice => {
          if (allPracticeIds.has(practice.id)) {
            reportError(`js/data/${levelId}/${lessonFileName}`, `Duplicate practice ID: ${practice.id}`);
          }
          allPracticeIds.add(practice.id);

          if (!practice.testCases || practice.testCases.length === 0) {
            reportError(`js/data/${levelId}/${lessonFileName}`, `Published practice must not have zero test cases (practice ID ${practice.id})`);
          }
        });
      }

    } else if (lesson.status === 'draft') {
      // Draft allows missing files or placeholder content, but if file exists we can do a sanity check
      if (fs.existsSync(lessonFilePath)) {
        const lessonCode = fs.readFileSync(lessonFilePath, 'utf8');
        try {
          vm.runInContext(lessonCode, context);
        } catch (e) {
          reportError(`js/data/${levelId}/${lessonFileName}`, `Draft file has syntax error: ${e.message}`);
        }
      }
    } else if (lesson.status && lesson.status !== 'archived') {
       reportError('course-structure.js', `Unknown status '${lesson.status}' for lesson ${lessonKey}`);
    }
  }
}

if (hasError) {
  console.error('\x1b[31mCourse data validation failed.\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32mCourse data validation passed.\x1b[0m');
}
