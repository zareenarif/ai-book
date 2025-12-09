# Standardize Lesson Format Script
# Removes emojis from headers and ensures consistent formatting

$lessonsPath = "textbook-platform\docs\book\chapters"

# Get all lesson files
$lessons = Get-ChildItem -Path $lessonsPath -Recurse -Filter "week-*.md"

Write-Host "Found $($lessons.Count) lesson files to process..."

foreach ($lesson in $lessons) {
    Write-Host "Processing: $($lesson.Name)"

    $content = Get-Content $lesson.FullName -Raw -Encoding UTF8

    # Remove emojis from section headers
    $content = $content -replace '## 🎯 ', '## '
    $content = $content -replace '## 🧠 ', '## '
    $content = $content -replace '## 🏗️ ', '## '
    $content = $content -replace '## 🔗 ', '## '
    $content = $content -replace '## 🚀 ', '## '
    $content = $content -replace '## ❗ ', '## '
    $content = $content -replace '## 🦿 ', '## '
    $content = $content -replace '## 🔌 ', '## '
    $content = $content -replace '## 👁️ ', '## '
    $content = $content -replace '## 💬 ', '## '
    $content = $content -replace '## 🚶 ', '## '
    $content = $content -replace '## 🤖 ', '## '
    $content = $content -replace '## 📝 ', '## '
    $content = $content -replace '## 📚 ', '## '
    $content = $content -replace '## 📖 ', '## '
    $content = $content -replace '## ✅ ', '## '
    $content = $content -replace '## 🔢 ', '## '
    $content = $content -replace '## ⚙️ ', '## '
    $content = $content -replace '## 🎮 ', '## '
    $content = $content -replace '## 🌊 ', '## '
    $content = $content -replace '### 🔹 ', '### '

    # Remove emojis from title headers
    $content = $content -replace '# 🤖 Week', '# Week'
    $content = $content -replace '# 🔌 Week', '# Week'
    $content = $content -replace '# 👁️ Week', '# Week'

    # Remove emoji bullet points
    $content = $content -replace '- ✅ ', '- '
    $content = $content -replace '- 📷 ', '- '
    $content = $content -replace '- 🌊 ', '- '
    $content = $content -replace '- 📡 ', '- '
    $content = $content -replace '- 🔦 ', '- '
    $content = $content -replace '- 🧭 ', '- '
    $content = $content -replace '- 👣 ', '- '
    $content = $content -replace '- 🖐️ ', '- '
    $content = $content -replace '- 🌡️ ', '- '
    $content = $content -replace '- 💨 ', '- '
    $content = $content -replace '- 💡 ', '- '

    # Save the updated content
    Set-Content -Path $lesson.FullName -Value $content -Encoding UTF8 -NoNewline
}

Write-Host "`nStandardization complete!"
Write-Host "Emojis removed from all lesson headers."
Write-Host "`nNext steps:"
Write-Host "1. Run 'cd textbook-platform && npm run build' to test"
Write-Host "2. Review lessons to ensure Prerequisites sections are present"
Write-Host "3. Verify all lessons have <ExerciseSection> and <QuizComponent> components"
