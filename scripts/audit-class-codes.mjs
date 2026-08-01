#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const PREFIXES = {
  PTB: { program: 'python', portal: 'python', level: 'basic', courseId: 'basic' },
  PTA: { program: 'python', portal: 'python', level: 'advance', courseId: 'advance' },
  PTI: { program: 'python', portal: 'python', level: 'intensive', courseId: 'intensive' },
  JSB: { program: 'web', portal: 'web', level: 'basic', courseId: 'web-basic' },
  JSA: { program: 'web', portal: 'web', level: 'advance', courseId: 'web-advance' },
  JSI: { program: 'web', portal: 'web', level: 'intensive', courseId: 'web-intensive' },
  CSB: { program: 'computer-science', portal: 'cs', level: 'basic', courseId: 'cs-basic' },
  CSA: { program: 'computer-science', portal: 'cs', level: 'advance', courseId: 'cs-advance' },
  CSI: { program: 'computer-science', portal: 'cs', level: 'intensive', courseId: 'cs-intensive' }
};

const CLASS_CODE_PATTERN = /^(PTB|PTA|PTI|JSB|JSA|JSI|CSB|CSA|CSI)[0-9]{1,3}$/;

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function normalizeClassCode(value) {
  return String(value ?? '').trim().toUpperCase();
}

function extractRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.classes)) return payload.classes;
  if (payload?.classes && typeof payload.classes === 'object') {
    return Object.entries(payload.classes).map(([id, value]) => ({ id, ...value }));
  }
  return [];
}

function auditRows(rows) {
  const errors = [];
  const warnings = [];
  const records = [];
  const seenCodes = new Map();

  rows.forEach((row, index) => {
    const documentId = row?.id ?? row?.docId ?? row?.documentId ?? `row-${index + 1}`;
    const rawCode = row?.code ?? row?.classCode ?? row?.name ?? '';
    const classCode = normalizeClassCode(rawCode);
    const prefix = classCode.match(/^[A-Z]{3}/)?.[0] ?? '';
    const mapping = PREFIXES[prefix];

    if (!row || typeof row !== 'object') {
      errors.push({ row: index + 1, documentId, reason: 'row is not an object' });
      return;
    }
    if (!row?.code && !row?.classCode) warnings.push({ row: index + 1, documentId, reason: 'missing code field; using name fallback' });
    if (!classCode || !CLASS_CODE_PATTERN.test(classCode)) {
      errors.push({ row: index + 1, documentId, classCode, reason: 'invalid or unsupported class code' });
      return;
    }
    if (seenCodes.has(classCode)) {
      errors.push({ row: index + 1, documentId, classCode, reason: `duplicate of ${seenCodes.get(classCode)}` });
      return;
    }
    seenCodes.set(classCode, documentId);
    records.push({ documentId, classCode, ...mapping, active: row.active !== false });
  });

  return {
    sourceRows: rows.length,
    validRows: records.length,
    errorCount: errors.length,
    warningCount: warnings.length,
    errors,
    warnings,
    records,
    status: errors.length ? 'FAIL' : 'PASS'
  };
}

const inputPath = readArgument('--input');
if (!inputPath) {
  console.error('CLASS_AUDIT_BLOCKED: provide a Firestore JSON export or fixture with --input <file>');
  process.exitCode = 2;
} else {
  const resolvedPath = path.resolve(inputPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`CLASS_AUDIT_BLOCKED: input not found: ${resolvedPath}`);
    process.exitCode = 2;
  } else {
    try {
      const payload = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
      const report = auditRows(extractRows(payload));
      console.log(JSON.stringify(report, null, 2));
      process.exitCode = report.errorCount ? 1 : 0;
    } catch (error) {
      console.error(`CLASS_AUDIT_BLOCKED: ${error.message}`);
      process.exitCode = 2;
    }
  }
}

export { CLASS_CODE_PATTERN, PREFIXES, auditRows, extractRows, normalizeClassCode };
