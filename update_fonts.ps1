$oldLink = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap'
$newLink = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;500;600;700&display=swap'

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace [regex]::Escape($oldLink), $newLink
    $content = $content -replace "'Cinzel', serif", "'Montserrat', sans-serif"
    $content = $content -replace "'Libre Baskerville', serif", "'Montserrat', sans-serif"
    $content = $content -replace "'Inter', sans-serif", "'Open Sans', sans-serif"
    Set-Content $_.FullName $content -Encoding UTF8
}
