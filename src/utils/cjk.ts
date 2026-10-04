export function isCJK(code: number): boolean {
  return (
    (code >= 0x4e00 && code <= 0x9fff) || // CJK Unified Ideographs
    (code >= 0x3400 && code <= 0x4dbf) || // Extension A
    (code >= 0xf900 && code <= 0xfaff) || // Compatibility Ideographs
    (code >= 0x3000 && code <= 0x303f) || // CJK Symbols & Punctuation
    (code >= 0xff00 && code <= 0xffef) || // Fullwidth Forms
    (code >= 0x2018 && code <= 0x201f) || // Curly quotes
    (code >= 0xfe30 && code <= 0xfe4f) // CJK Compatibility Forms
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
