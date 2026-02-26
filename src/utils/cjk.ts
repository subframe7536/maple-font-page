export function isCJK(code: number): boolean {
  return (
    (code >= 0x4E00 && code <= 0x9FFF) // CJK Unified Ideographs
    || (code >= 0x3400 && code <= 0x4DBF) // Extension A
    || (code >= 0xF900 && code <= 0xFAFF) // Compatibility Ideographs
    || (code >= 0x3000 && code <= 0x303F) // CJK Symbols & Punctuation
    || (code >= 0xFF00 && code <= 0xFFEF) // Fullwidth Forms
    || (code >= 0x2018 && code <= 0x201F) // Curly quotes
    || (code >= 0xFE30 && code <= 0xFE4F) // CJK Compatibility Forms
  )
}

export interface TextSegment {
  text: string
  isCJK: boolean
}

export function segmentText(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let currentText = ''
  let currentIsCJK: boolean | null = null

  for (const char of text) {
    const code = char.codePointAt(0)!
    const charIsCJK = isCJK(code)

    if (currentIsCJK !== null && charIsCJK !== currentIsCJK) {
      segments.push({ text: currentText, isCJK: currentIsCJK })
      currentText = ''
    }
    currentIsCJK = charIsCJK
    currentText += char
  }

  if (currentText && currentIsCJK !== null) {
    segments.push({ text: currentText, isCJK: currentIsCJK })
  }

  return segments
}
