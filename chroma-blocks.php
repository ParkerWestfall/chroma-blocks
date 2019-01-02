<?php
/**
 * Plugin Name: Chroma Blocks
 * Plugin URI: https://github.com/Timbral
 * Description: Custom blocks for the gutenberg editor.
 * Author: Parker Westfall
 * Author URI: https://github.com/Timbral
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
