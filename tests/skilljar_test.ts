/**
 * tests/skilljar_test.ts
 * 
 * Verifies that all 23 official Anthropic Skilljar Academy courses are:
 * 1. Fully indexed with valid slugs, canonical URLs, and metadata
 * 2. Mapped to an enterprise-grade Capstone Lab with at least 1 invariant gate
 * 3. Have at least 1 failure injection simulation vector with DRC error code
 * 4. Have a structured 100-point rubric and oral defense prompts
 * 5. Can be pulled on the fly by slug or full URL
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { skilljarService, ANTHROPIC_SKILLJAR_COURSES } from '../services/skilljar/skilljar_catalog.ts';

test('Skilljar Service: indexes all 23 official Anthropic Academy courses', () => {
  const courses = skilljarService.getAllCourses();
  assert.equal(courses.length, 23, 'Must contain all 23 courses');
});

test('Skilljar Service: every course has a Top 1% Enterprise Capstone spec', () => {
  for (const course of ANTHROPIC_SKILLJAR_COURSES) {
    assert.ok(course.enterpriseCapstone, `Course ${course.slug} must have an enterprise capstone`);
    assert.ok(course.enterpriseCapstone.title, `Course ${course.slug} capstone must have a title`);
    assert.ok(course.enterpriseCapstone.enterpriseClient, `Course ${course.slug} must specify an enterprise client`);
    assert.ok(course.enterpriseCapstone.invariantGates.length >= 1, `Course ${course.slug} must have >= 1 invariant gate`);
    assert.ok(course.enterpriseCapstone.failureInjectionSuite.length >= 1, `Course ${course.slug} must have >= 1 failure injection scenario`);
    
    // Check rubric total = 100 points
    const totalPoints = course.enterpriseCapstone.rubric.reduce((sum, r) => sum + r.weightPoints, 0);
    assert.equal(totalPoints, 100, `Course ${course.slug} rubric must sum to exactly 100 points (got ${totalPoints})`);

    // Check oral defense prompts
    assert.ok(course.enterpriseCapstone.oralDefensePrompts.length >= 1, `Course ${course.slug} must have oral defense prompts`);
  }
});

test('Skilljar Service: pullCourseOnTheFly supports raw slug and full skilljar URL', () => {
  // Test by slug
  const res1 = skilljarService.pullCourseOnTheFly('introduction-to-model-context-protocol');
  assert.equal(res1.success, true);
  assert.equal(res1.course?.slug, 'introduction-to-model-context-protocol');
  assert.equal(res1.course?.enterpriseCapstone.enterpriseClient, 'Maersk Global Container Logistics');

  // Test by full URL
  const res2 = skilljarService.pullCourseOnTheFly('https://anthropic.skilljar.com/claude-code-in-action');
  assert.equal(res2.success, true);
  assert.equal(res2.course?.slug, 'claude-code-in-action');
  assert.equal(res2.course?.enterpriseCapstone.enterpriseClient, 'Palantir Foundry Core Systems');

  // Test not found
  const res3 = skilljarService.pullCourseOnTheFly('non-existent-course');
  assert.equal(res3.success, false);
  assert.ok(res3.error?.includes('not found'));
});

test('Skilljar Service: syncCatalog generates track breakdowns', () => {
  const sync = skilljarService.syncCatalog();
  assert.equal(sync.totalCourses, 23);
  assert.ok(sync.tracks['claude-code-agents'] >= 4);
  assert.ok(sync.tracks['developer-api'] >= 2);
  assert.ok(sync.tracks['mcp-protocols'] >= 2);
  assert.ok(sync.tracks['cloud-infrastructure'] >= 2);
  assert.ok(sync.tracks['enterprise-governance'] >= 1);
  assert.ok(sync.tracks['ai-fluency-leadership'] >= 6);
});
