import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, TOTAL_LESSONS } from '../src/data/courses.js';

test('course contract contains three 14-lesson draft courses', () => {
  assert.deepEqual(COURSES.map((course) => course.id), ['web-basic', 'web-advance', 'web-intensive']);
  assert.equal(TOTAL_LESSONS, 42);
  assert.equal(COURSES.every((course) => course.lessons.length === 14), true);
  assert.equal(COURSES.flatMap((course) => course.lessons).every((lesson) => lesson.status === 'draft'), true);
});

test('intensive lesson 13 remains explicitly unresolved', () => {
  assert.equal(COURSES[2].lessons[12].titleNeedsConfirmation, true);
  assert.match(COURSES[2].lessons[12].title, /Chưa có tiêu đề/);
});
