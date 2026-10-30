#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const requiredContentKeys = [
  'about',
  'eventInformation',
  'speakerCategories',
  'localOrganizers',
  'specialThanks'
];
const validSpeakerCategories = new Set(['keynote', 'diskeynote', 'plenary', 'others', 'panel']);

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      if (field.length === 0) {
        quoted = true;
      } else {
        field += character;
      }
      continue;
    }

    if (character === ',') {
      row.push(field.trim());
      field = '';
      continue;
    }

    if (character === '\n' || character === '\r') {
      if (character === '\r' && text[index + 1] === '\n') index += 1;
      row.push(field.trim());
      if (row.some(value => value !== '')) {
        rows.push(row);
      }
      row = [];
      field = '';
      continue;
    }

    field += character;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some(value => value !== '')) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows.shift().map(value => value.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9_]/g, ''));
  return rows.map((values) => {
    const record = { idx: rows.indexOf(values) };
    headers.forEach((header, columnIndex) => {
      record[header] = values[columnIndex] || '';
    });
    return record;
  });
}

function normalizeName(value) {
  return String(value || '')
    .trim()
    .replace(/\s*\/.*$/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .toLowerCase();
}

function getSpeakerAliases(row) {
  const aliases = new Set();
  [row.speaker, row.name, row.tabtitle, row.speakername, row.fullname].forEach(value => {
    if (!value) return;
    String(value)
      .split('/')
      .map(part => part.trim())
      .forEach(part => {
        aliases.add(normalizeName(part));
      });
  });
  return [...aliases].filter(Boolean);
}

function ensureFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} is missing: ${path.relative(rootDir, filePath)}`);
  }
}

function main() {
  const errors = [];
  const warnings = [];

  ensureFileExists(path.join(rootDir, 'data', 'Theoryday_2026_DEC.csv'), 'Speaker CSV');
  ensureFileExists(path.join(rootDir, 'data', 'schedule.csv'), 'Schedule CSV');
  ensureFileExists(path.join(rootDir, 'data', 'site-content.json'), 'Site content JSON');

  const speakerText = fs.readFileSync(path.join(rootDir, 'data', 'Theoryday_2026_DEC.csv'), 'utf8');
  const speakerRows = parseCSV(speakerText);
  if (!speakerRows.length) {
    errors.push('The speaker CSV is empty or missing usable rows.');
  }

  const categoryCounts = new Map();
  speakerRows.forEach((row, index) => {
    const rowNumber = index + 2;
    const category = String(row.category || '').trim().toLowerCase();
    if (!row.speaker) {
      errors.push(`Speaker row ${rowNumber} is missing a speaker name.`);
    }
    if (!category) {
      errors.push(`Speaker row ${rowNumber} is missing a category.`);
    } else if (!validSpeakerCategories.has(category)) {
      errors.push(`Speaker row ${rowNumber} has unsupported category: ${category}`);
    }

    const imageLink = String(row.image_link || '').trim();
    if (imageLink) {
      const imagePath = path.join(rootDir, imageLink);
      if (!fs.existsSync(imagePath)) {
        errors.push(`Speaker row ${rowNumber} references a missing image: ${imageLink}`);
      }
    } else if (category !== 'panel') {
      warnings.push(`Speaker row ${rowNumber} is missing image_link.`);
    }

    if (category) {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    }
  });

  const scheduleText = fs.readFileSync(path.join(rootDir, 'data', 'schedule.csv'), 'utf8');
  const scheduleRows = parseCSV(scheduleText);
  const scheduleTimes = new Map();
  const scheduleSpeakerNames = new Set();
  speakerRows.forEach((row) => {
    getSpeakerAliases(row).forEach((alias) => scheduleSpeakerNames.add(alias));
  });

  scheduleRows.forEach((row, index) => {
    const rowNumber = index + 2;
    const day = String(row.day || '').trim();
    const time = String(row.time || '').trim();
    const type = String(row.type || '').trim();
    const speaker = String(row.speaker || '').trim();

    if (!type) {
      warnings.push(`Schedule row ${rowNumber} is missing a type.`);
    }

    if (day && time) {
      const key = `${day}|${time}`;
      if (scheduleTimes.has(key)) {
        errors.push(`Duplicate schedule slot at Day ${day}, time ${time}.`);
      }
      scheduleTimes.set(key, rowNumber);
    }

    if (speaker) {
      const normalizedSpeaker = normalizeName(speaker);
      const matched = [...scheduleSpeakerNames].some(name => name.includes(normalizedSpeaker) || normalizedSpeaker.includes(name));
      if (!matched && !speaker.includes('(')) {
        warnings.push(`Schedule speaker on row ${rowNumber} was not found in the speaker CSV: ${speaker}`);
      }
    }
  });

  try {
    const content = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'site-content.json'), 'utf8'));
    for (const key of requiredContentKeys) {
      if (!(key in content)) {
        errors.push(`site-content.json is missing required key: ${key}`);
      }
    }
  } catch (error) {
    errors.push(`site-content.json could not be parsed: ${error.message}`);
  }

  if (errors.length > 0) {
    console.error('Data validation failed.');
    errors.forEach((error) => console.error(`- ${error}`));
    if (warnings.length > 0) {
      console.error('\nWarnings:');
      warnings.forEach((warning) => console.error(`- ${warning}`));
    }
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('Data validation passed with warnings:');
    warnings.forEach((warning) => console.warn(`- ${warning}`));
    process.exit(0);
  }

  console.log(`Data validation passed. Speakers: ${speakerRows.length}; schedule entries: ${scheduleRows.length}; categories: ${[...categoryCounts.entries()].map(([key, value]) => `${key}:${value}`).join(', ')}`);
}

main();
