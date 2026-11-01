const fs = require('fs');
const content = fs.readFileSync('src/data/practiceProblemBank.ts', 'utf8');

const bankTopics = [];
const lines = content.split('\n');
for (const line of lines) {
  const m = line.match(/^\s*['"]([^'"]+)['"]\s*:\s*\{/);
  if (m && !m[1].includes('id') && !m[1].includes('topic')) {
    bankTopics.push(m[1]);
  }
}

console.log('Bank topics:', bankTopics);

const funcMatch = content.match(/function getProblemsForTopicAndDifficulty[\s\S]*?\n\}/);
if (funcMatch) console.log('\n' + funcMatch[0]);
