$oldLogo = 'icamek-logo-white.png'
$newLogo = 'https://icamek.org/wp-content/uploads/2021/11/icamek-logo-white.png'
$utf8NoBom = New-Object System.Text.UTF8Encoding $False

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace [regex]::Escape($oldLogo), $newLogo
    # Clean up any broken encoding characters from previous error
    $content = $content -replace "â€”", "&mdash;"
    [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
}
