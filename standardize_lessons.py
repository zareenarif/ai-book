#!/usr/bin/env python3
"""
Standardize Lesson Format Script
Removes emojis from headers and ensures consistent formatting
"""

import os
import re
from pathlib import Path

# Path to lessons
lessons_path = Path("textbook-platform/docs/book/chapters")

# Find all lesson files
lesson_files = list(lessons_path.rglob("week-*.md"))

print(f"Found {len(lesson_files)} lesson files to process...")

# Emoji patterns to remove
emoji_replacements = [
    # Section header emojis
    (r'## 🎯 ', '## '),
    (r'## 🧠 ', '## '),
    (r'## 🏗️ ', '## '),
    (r'## 🔗 ', '## '),
    (r'## 🚀 ', '## '),
    (r'## ❗ ', '## '),
    (r'## 🦿 ', '## '),
    (r'## 🔌 ', '## '),
    (r'## 👁️ ', '## '),
    (r'## 💬 ', '## '),
    (r'## 🚶 ', '## '),
    (r'## 🤖 ', '## '),
    (r'## 📝 ', '## '),
    (r'## 📚 ', '## '),
    (r'## 📖 ', '## '),
    (r'## ✅ ', '## '),
    (r'## 🔢 ', '## '),
    (r'## ⚙️ ', '## '),
    (r'## 🎮 ', '## '),
    (r'## 🌊 ', '## '),
    (r'## 🌐 ', '## '),
    (r'## 🧩 ', '## '),
    (r'## 🔄 ', '## '),
    (r'## 🛠️ ', '## '),
    (r'### 🔹 ', '### '),

    # Title emojis
    (r'# 🤖 Week', '# Week'),
    (r'# 🔌 Week', '# Week'),
    (r'# 👁️ Week', '# Week'),

    # Bullet point emojis
    (r'- ✅ ', '- '),
    (r'- 📷 ', '- '),
    (r'- 🌊 ', '- '),
    (r'- 📡 ', '- '),
    (r'- 🔦 ', '- '),
    (r'- 🧭 ', '- '),
    (r'- 👣 ', '- '),
    (r'- 🖐️ ', '- '),
    (r'- 🌡️ ', '- '),
    (r'- 💨 ', '- '),
    (r'- 💡 ', '- '),
]

for lesson_file in lesson_files:
    print(f"Processing: {lesson_file.name}")

    # Read the file
    with open(lesson_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply all emoji replacements
    for pattern, replacement in emoji_replacements:
        content = re.sub(pattern, replacement, content)

    # Write back
    with open(lesson_file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"\n✓ Standardization complete!")
print(f"✓ Emojis removed from {len(lesson_files)} lesson files")
print("\nNext steps:")
print("1. Run 'cd textbook-platform && npm run build' to test")
print("2. Review lessons to ensure Prerequisites sections are present")
print("3. Verify all lessons have ExerciseSection and QuizComponent components")
