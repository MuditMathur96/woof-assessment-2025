import PdfParse from "pdf-parse";
class PDFReader{

    cleanPdfText(rawText: string): string {
  return rawText
    // Replace multiple line breaks with 2 line breaks (to preserve paragraphs/sections)
    .replace(/(\r\n|\r|\n){2,}/g, '\n\n')
    // Replace single line breaks (often mid-sentence due to PDF formatting) with a space
    .replace(/([^\n])\n([^\n])/g, '$1 $2')
    // Remove excessive whitespace
    .replace(/[ \t]+/g, ' ')
    // Remove leading/trailing whitespace
    .trim()
    // Optional: Normalize bullet points or headers if needed
    .replace(/•/g, '-') // convert bullets
}
structurePdfText(rawText: string): string {
  let text = this.cleanPdfText(rawText);

  // Try to mark sections (use heuristics or regex)
  const sectionHeaders = [
    'education', 'experience', 'skills', 'projects', 'summary',
    'work history', 'certifications', 'interests'
  ];

  for (const header of sectionHeaders) {
    const regex = new RegExp(`\\b(${header})\\b`, 'gi');
    text = text.replace(regex, '\n\n=== $1 ===\n\n');
  }

  return text;
}

async parse(pdf:Buffer){
    const rawtext = await PdfParse(pdf);

    return this.structurePdfText(rawtext.text);



}
}

export default new PDFReader();