$faviconTag = "<link rel=`"icon`" href=`"https://icamek.org/wp-content/uploads/2021/11/cropped-logo-32x32.png`" sizes=`"32x32`" />`n  <link rel=`"apple-touch-icon`" href=`"https://icamek.org/wp-content/uploads/2021/11/cropped-logo-180x180.png`" />"

$noScrollCss = "
    /* ===== HIDE SCROLLBAR ===== */
    ::-webkit-scrollbar {
      display: none;
    }
    html {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      overflow-x: hidden;
      width: 100%;
    }
    body {
      overflow-x: hidden;
      width: 100%;
    }
"

$utf8NoBom = New-Object System.Text.UTF8Encoding $False

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # 1. Add Favicon before </head> if not exists
    if ($content -notmatch "rel=`"icon`"") {
        $content = $content -replace "</head>", ("  " + $faviconTag + "`n</head>")
    }

    # 2. Add No-Scrollbar CSS right after <style>
    if ($content -notmatch "::-webkit-scrollbar") {
        $content = $content -replace "<style>", ("<style>" + $noScrollCss)
    }

    [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
}
