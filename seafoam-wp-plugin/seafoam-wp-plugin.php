<?php
/*
Plugin Name: Seafoam Photo App
Version: 16.0
*/
add_action('init', function() {
$uri = $_SERVER['REQUEST_URI'];
if ($uri !== '/' && $uri !== '/index.php' && $uri !== '') return;
if (is_admin()) return;
if (strpos($uri, 'wp-admin') !== false) return;
if (strpos($uri, 'wp-login') !== false) return;
$f = plugin_dir_path(__FILE__) . 'index.html';
if (file_exists($f)) {
$h = file_get_contents($f);
$u = plugin_dir_url(__FILE__);
$h = str_replace('"/uploaded-photo-', '"' . $u . 'uploaded-photo-', $h);
$h = str_replace('<title>My Google AI Studio App</title>', '<title>Seafoam Photo</title>', $h);
$h = str_replace('<title>Seafoam Photo</title>', '<title>Seafoam Photo</title><link rel="icon" type="image/jpeg" href="' . $u . 'uploaded-photo-9.jpg">', $h);
echo $h;
exit;
}
}, 1);
