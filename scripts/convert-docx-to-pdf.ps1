# Converts the exact original user DOCX to PDF using native Word COM
param(
    [string]$DocxPath = "C:\Users\SHAHID\.gemini\antigravity\brain\0e780f36-684b-41ea-9292-3162f4820f95\.user_uploaded\media_1791913370140_84b136a7.docx",
    [string]$PdfPath = "$PSScriptRoot\..\public\pdfs\html5-complete-notes.pdf"
)

$resolvedDocx = (Resolve-Path $DocxPath).Path
$resolvedPdf = [System.IO.Path]::GetFullPath($PdfPath)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    Write-Host "Opening document: $resolvedDocx"
    $doc = $word.Documents.Open($resolvedDocx)
    Write-Host "Exporting exact PDF to: $resolvedPdf"
    $doc.SaveAs([ref]$resolvedPdf, [ref]17)
    $doc.Close()
    Write-Host "Successfully generated exact PDF ($((Get-Item $resolvedPdf).Length / 1MB) MB)"
} catch {
    Write-Error "Error during Word export: $_"
} finally {
    $word.Quit()
}
