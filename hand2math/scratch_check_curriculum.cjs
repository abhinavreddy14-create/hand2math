const fs = require('fs');
const content = fs.readFileSync('src/data/mathCurriculum.ts', 'utf8');

// extract topics from categories
const topicRegex = /\{\s*id:\s*['"]([a-zA-Z0-9_-]+)['"],\s*name:\s*['"]([^'"]+)['"]\s*\}/g;
let match;
const allCategoryTopics = [];
while ((match = topicRegex.exec(content)) !== null) {
  // make sure it's not a category id
  allCategoryTopics.push({ id: match[1], name: match[2] });
}

// extract TOPIC_DATA keys
const topicDataKeys = [];
const lines = content.split('\n');
let insideTopicData = false;
for (const line of lines) {
  if (line.includes('export const TOPIC_DATA:')) {
    insideTopicData = true;
    continue;
  }
  if (insideTopicData) {
    const keyMatch = line.match(/^\s*['"]([a-zA-Z0-9_-]+)['"]\s*:\s*\{/);
    if (keyMatch) {
      topicDataKeys.push(keyMatch[1]);
    }
  }
}

console.log('Total topics in categories:', allCategoryTopics.length);
console.log('Total topics implemented in TOPIC_DATA:', topicDataKeys.length);

const implementedSet = new Set(topicDataKeys);
const missing = allCategoryTopics.filter(t => !implementedSet.has(t.id));
console.log('Missing topics count:', missing.length);
console.log('Missing topics:', missing.map(m => m.id + ' (' + m.name + ')'));

// Check fallback in getTopicOrDefault
console.log('\nCheck getTopicOrDefault:');
const funcMatch = content.match(/function getTopicOrDefault[\s\S]*?\n\}/);
if (funcMatch) console.log(funcMatch[0]);
