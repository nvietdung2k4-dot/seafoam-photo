# WordPress Plugin Upload Script
$ErrorActionPreference = 'Stop'
$wpUrl = 'https://seafoamphoto.site'
$user = 'nvietdung2k4@gmail.com'
$pass = 'Baitapthuongmaidientu'
$zipPath = 'c:\temp\seafoam-plugin.zip'

Write-Host "=== Step 1: Logging in to WordPress ===" -ForegroundColor Cyan
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$loginBody = @{
    log = $user
    pwd = $pass
    'wp-submit' = 'Log In'
    redirect_to = "$wpUrl/wp-admin/"
    testcookie = '1'
}
try {
    $loginResult = Invoke-WebRequest -Uri "$wpUrl/wp-login.php" -Method POST -Body $loginBody -WebSession $session -MaximumRedirection 5 -UseBasicParsing
    Write-Host "Login successful! Status: $($loginResult.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Login response: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
}

Write-Host "`n=== Step 2: Getting upload page nonce ===" -ForegroundColor Cyan
$uploadPage = Invoke-WebRequest -Uri "$wpUrl/wp-admin/plugin-install.php?tab=upload" -WebSession $session -UseBasicParsing
$nonceMatch = [regex]::Match($uploadPage.Content, 'name="_wpnonce"\s+value="([^"]+)"')
if (-not $nonceMatch.Success) {
    $nonceMatch = [regex]::Match($uploadPage.Content, '_wpnonce[^"]*"([a-f0-9]+)"')
}
$nonce = $nonceMatch.Groups[1].Value
Write-Host "Nonce: $nonce" -ForegroundColor Green

Write-Host "`n=== Step 3: Uploading plugin ZIP ===" -ForegroundColor Cyan
# Build multipart form data manually
$boundary = "----WebKitFormBoundary" + [System.Guid]::NewGuid().ToString("N").Substring(0,16)
$CRLF = "`r`n"

$bodyParts = @()
# _wpnonce field
$bodyParts += "--$boundary"
$bodyParts += 'Content-Disposition: form-data; name="_wpnonce"'
$bodyParts += ''
$bodyParts += $nonce
# _wp_http_referer field
$bodyParts += "--$boundary"
$bodyParts += 'Content-Disposition: form-data; name="_wp_http_referer"'
$bodyParts += ''
$bodyParts += '/wp-admin/plugin-install.php?tab=upload'
# install-plugin-submit field
$bodyParts += "--$boundary"
$bodyParts += 'Content-Disposition: form-data; name="install-plugin-submit"'
$bodyParts += ''
$bodyParts += 'Install Now'
# File field header
$bodyParts += "--$boundary"
$bodyParts += 'Content-Disposition: form-data; name="pluginzip"; filename="seafoam-wp-plugin.zip"'
$bodyParts += 'Content-Type: application/zip'
$bodyParts += ''

$headerText = ($bodyParts -join $CRLF) + $CRLF
$footerText = "$CRLF--$boundary--$CRLF"

$headerBytes = [System.Text.Encoding]::UTF8.GetBytes($headerText)
$fileBytes = [System.IO.File]::ReadAllBytes($zipPath)
$footerBytes = [System.Text.Encoding]::UTF8.GetBytes($footerText)

$bodyStream = New-Object System.IO.MemoryStream
$bodyStream.Write($headerBytes, 0, $headerBytes.Length)
$bodyStream.Write($fileBytes, 0, $fileBytes.Length)
$bodyStream.Write($footerBytes, 0, $footerBytes.Length)
$bodyArray = $bodyStream.ToArray()
$bodyStream.Dispose()

Write-Host "Uploading $([math]::Round($bodyArray.Length/1024))KB..." -ForegroundColor Yellow
$uploadResult = Invoke-WebRequest -Uri "$wpUrl/wp-admin/update.php?action=upload-plugin" -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body $bodyArray -WebSession $session -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue

if ($uploadResult.StatusCode -eq 200) {
    Write-Host "Upload successful!" -ForegroundColor Green
    # Check if plugin already exists
    if ($uploadResult.Content -match 'already exists') {
        Write-Host "Plugin folder already exists, trying to replace..." -ForegroundColor Yellow
        # Find the overwrite URL
        $overwriteMatch = [regex]::Match($uploadResult.Content, 'href="([^"]*overwrite=update-plugin[^"]*)"')
        if ($overwriteMatch.Success) {
            $overwriteUrl = [System.Web.HttpUtility]::HtmlDecode($overwriteMatch.Groups[1].Value)
            if (-not $overwriteUrl.StartsWith('http')) { $overwriteUrl = "$wpUrl$overwriteUrl" }
            Write-Host "Overwriting existing plugin..." -ForegroundColor Yellow
            $overwriteResult = Invoke-WebRequest -Uri $overwriteUrl -WebSession $session -UseBasicParsing
            Write-Host "Overwrite result: $($overwriteResult.StatusCode)" -ForegroundColor Green
        }
    }
    # Check for activate link
    $activateMatch = [regex]::Match($uploadResult.Content, 'href="([^"]*action=activate[^"]*)"')
    if ($activateMatch.Success) {
        $activateUrl = [System.Web.HttpUtility]::HtmlDecode($activateMatch.Groups[1].Value)
        if (-not $activateUrl.StartsWith('http')) { $activateUrl = "$wpUrl$activateUrl" }
        Write-Host "`n=== Step 4: Activating plugin ===" -ForegroundColor Cyan
        $activateResult = Invoke-WebRequest -Uri $activateUrl -WebSession $session -UseBasicParsing -MaximumRedirection 5
        Write-Host "Plugin activated! Status: $($activateResult.StatusCode)" -ForegroundColor Green
    } else {
        Write-Host "No activate link found in response. Check manually." -ForegroundColor Yellow
    }
} else {
    Write-Host "Upload status: $($uploadResult.StatusCode)" -ForegroundColor Yellow
}

Write-Host "`n=== Step 5: Checking homepage ===" -ForegroundColor Cyan
$homepage = Invoke-WebRequest -Uri $wpUrl -UseBasicParsing
if ($homepage.Content -match 'SeaFoam') {
    Write-Host "SUCCESS! SeaFoam Photo website is now live!" -ForegroundColor Green
} else {
    Write-Host "Homepage does not show SeaFoam content yet. Content length: $($homepage.Content.Length)" -ForegroundColor Yellow
}

Write-Host "`nDone!" -ForegroundColor Green
