$utf8NoBom = New-Object System.Text.UTF8Encoding $False

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # Remove the entire breadcrumb div
    $content = $content -replace "(?sm)^\s*<div class=`"breadcrumb`">.*?</div>\s*", ""

    [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
}
