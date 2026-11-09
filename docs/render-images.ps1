# Re-renders the PNG brand images from their HTML sources using Microsoft Edge (headless).
# Usage (from the repo root):  powershell -ExecutionPolicy Bypass -File docs/render-images.ps1
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge not found.' }

function Render($src, $out, $w, $h) {
  $url = 'file:///' + ((Join-Path $root $src) -replace '\\', '/')
  $dst = Join-Path $root $out
  & $edge --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
    --virtual-time-budget=4000 --window-size="$w,$h" --screenshot="$dst" $url | Out-Null
  Start-Sleep -Milliseconds 500
  Write-Host "Rendered $out ($w x $h)"
}

New-Item -ItemType Directory -Force (Join-Path $root 'assets/img') | Out-Null
Render 'docs/social/og-image.html' 'assets/img/og-image.png' 1200 630
Render 'docs/social/icon.html' 'assets/img/icon-512.png' 512 512

# Headless Edge cannot render windows smaller than ~500px, so downscale the 512 icon to 180.
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile((Join-Path $root 'assets/img/icon-512.png'))
$bmp = New-Object System.Drawing.Bitmap 180, 180
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($src, 0, 0, 180, 180)
$bmp.Save((Join-Path $root 'assets/img/apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
Write-Host 'Rendered assets/img/apple-touch-icon.png (180 x 180, downscaled)'
