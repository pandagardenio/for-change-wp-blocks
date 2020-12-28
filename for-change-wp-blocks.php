<?php

/**
 * Plugin Name:       For Change WP Gutenberg blocks
 * Plugin URI:        https://pandagarden.io
 * Description:       Gutenberg blocks for defining Places from For Change
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Pandagardenio
 * Author URI:        https://pandagarden.io
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function forChangeBlockCategories($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'for-change',
                'title' => 'For Change',
                'icon'  => 'wordpress',
            ),
        )
    );
}

add_filter( 'block_categories', 'forChangeBlockCategories', 10, 2 );

add_action( 'init', 'forChangeBlocks');

function forChangeBlocks() {

    if ( !function_exists( 'register_block_type' ) ) {
        return;
    }
    
    wp_register_script(
        'for-change-blocks-editor-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );

    $blocks = [
        'for-change/place'
    ];

    foreach( $blocks as $block ) {
		register_block_type( $block, array(
			'editor_script' => 'for-change-blocks-editor-script'
		) );	  
    }
    
}

add_action(
	'rest_api_init',
	function () {

		if ( ! function_exists( 'use_block_editor_for_post_type' ) ) {
			require ABSPATH . 'wp-admin/includes/post.php';
		}

		// Surface all Gutenberg blocks in the WordPress REST API
		$post_types = get_post_types_by_support( [ 'editor' ] );
		foreach ( $post_types as $post_type ) {
			if ( use_block_editor_for_post_type( $post_type ) ) {
				register_rest_field(
					$post_type,
					'blocks',
					[
						'get_callback' => function ( array $post ) {
							return parse_blocks( $post['content']['raw'] );
						},
					]
				);
			}
		}
	}
);