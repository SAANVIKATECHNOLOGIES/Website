# Minimal static file server for local preview (no Node/Python required).
# Usage: powershell -ExecutionPolicy Bypass -File .claude/serve.ps1 [-Port 8080]
param([int]$Port = 8080)
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$types = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'
  '.svg'='image/svg+xml'; '.png'='image/png'; '.ico'='image/x-icon'; '.json'='application/json'
  '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp'
  '.webmanifest'='application/manifest+json'; '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
  if ($path -eq '' -or $path.EndsWith('/')) { $path += 'index.html' }
  $file = Join-Path $root $path
  $full = [IO.Path]::GetFullPath($file)
  $status = 200
  if (-not $full.StartsWith($root) -or -not (Test-Path $full -PathType Leaf)) {
    $full = Join-Path $root '404.html'; $status = 404
  }
  try {
    $bytes = [IO.File]::ReadAllBytes($full)
    $ext = [IO.Path]::GetExtension($full).ToLower()
    $ctx.Response.StatusCode = $status
    $ctx.Response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' })
    $ctx.Response.Headers.Add('Cache-Control', 'no-store')
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch { $ctx.Response.StatusCode = 500 }
  $ctx.Response.Close()
  Write-Host "$status /$path"
}
