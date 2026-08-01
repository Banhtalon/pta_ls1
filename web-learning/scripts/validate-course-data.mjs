import { COURSES, TOTAL_LESSONS } from '../src/data/courses.js';

const errors = [];
const expectedIds = new Set(['web-basic', 'web-advance', 'web-intensive']);
if (COURSES.length !== 3) errors.push(`COURSES=${COURSES.length}, expected 3`);
if (TOTAL_LESSONS !== 42) errors.push(`LESSONS=${TOTAL_LESSONS}, expected 42`);
if (new Set(COURSES.map((course) => course.id)).size !== COURSES.length) errors.push('duplicate course id');

for (const course of COURSES) {
  if (!expectedIds.has(course.id)) errors.push(`unknown course id: ${course.id}`);
  if (course.lessons.length !== 14) errors.push(`${course.id} has ${course.lessons.length} lessons, expected 14`);
  course.lessons.forEach((lesson, index) => {
    const expectedOrder = index + 1;
    const expectedId = `${course.id}-${String(expectedOrder).padStart(2, '0')}`;
    if (lesson.id !== expectedId) errors.push(`${course.id}: unexpected id ${lesson.id}`);
    if (lesson.order !== expectedOrder) errors.push(`${lesson.id}: order mismatch`);
    if (lesson.courseId !== course.id) errors.push(`${lesson.id}: courseId mismatch`);
    if (lesson.status !== 'draft') errors.push(`${lesson.id}: placeholder must remain draft`);
    if (lesson.contentVersion !== 1) errors.push(`${lesson.id}: contentVersion must be 1 at baseline`);
    if (!lesson.title?.trim()) errors.push(`${lesson.id}: missing title`);
  });
}

const draftCount = COURSES.flatMap((course) => course.lessons).filter((lesson) => lesson.status === 'draft').length;
if (draftCount !== 42) errors.push(`DRAFT=${draftCount}, expected 42`);
const intensive13 = COURSES.find((course) => course.id === 'web-intensive')?.lessons[12];
if (!intensive13?.titleNeedsConfirmation) errors.push('web-intensive-13 must require title confirmation');

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('COURSES=3 LESSONS=42 DRAFT=42 TITLE_CONFIRMATION=web-intensive-13');
}
