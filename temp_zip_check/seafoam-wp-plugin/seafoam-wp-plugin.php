<?php
/**
 * Plugin Name: Seafoam Photo App
 * Description: Embeds the React application for Seafoam Photo using shortcode [seafoam_app].
 * Version: 1.0
 * Author: Antigravity
 */

if (!defined('ABSPATH')) {
    exit;
}

function seafoam_app_shortcode() {
    $html_file = plugin_dir_path(__FILE__) . 'index.html';
    
    if (!file_exists($html_file)) {
        return '<p>App file not found!</p>';
    }

    $html = file_get_contents($html_file);
    
    // Sửa các đường dẫn tương đối (từ Vite build) thành đường dẫn tuyệt đối trỏ tới thư mục plugin
    $plugin_url = plugin_dir_url(__FILE__);
    $html = str_replace('="/assets/', '="' . $plugin_url . 'assets/', $html);
    $html = str_replace('src="/', 'src="' . $plugin_url, $html);
    $html = str_replace('href="/', 'href="' . $plugin_url, $html);
    
    // Extract head
    preg_match('/<head[^>]*>(.*?)<\/head>/is', $html, $head_matches);
    $head_content = isset($head_matches[1]) ? $head_matches[1] : '';
    
    // Extract body
    preg_match('/<body[^>]*>(.*?)<\/body>/is', $html, $body_matches);
    $body_content = isset($body_matches[1]) ? $body_matches[1] : '';
    
    // Remove title and common meta tags that might conflict with WP
    $head_content = preg_replace('/<title>.*?<\/title>/is', '', $head_content);
    $head_content = preg_replace('/<meta charset.*?>/is', '', $head_content);
    $head_content = preg_replace('/<meta name="viewport".*?>/is', '', $head_content);
    
    return $head_content . $body_content;
}
add_shortcode('seafoam_app', 'seafoam_app_shortcode');
