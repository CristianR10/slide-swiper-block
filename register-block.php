<?php

function slider_block()
{

  if (!function_exists('register_block_type')) {
    return;
  }

  $front_script = './dist/front-script.min.js';
  $front_style = './dist/front-style.min.css';
  $editor_script = './dist/editor-script.min.js';
  $editor_style = './dist/editor-style.min.css';

  // wp_register_script(
  // 	'slider-block-script-editor',
  // 	plugins_url( $editor_script , __FILE__ ),
  // 	[],
  // 	'1.0.0'
  // );

  // wp_register_style(
  //   'slider-block-style-editor',
  //   plugins_url( $editor_style , __FILE__ ),
  //   [],
  //   '1.0.0'
  // );

  // Editor Script
  wp_register_script(
    'slider-block-script-editor',
    plugins_url($editor_script, __FILE__),
    array('wp-blocks', 'wp-element', 'wp-editor'),
    '1.0.0',
    true
  );

  // Editor Style
  wp_register_style(
    'slider-block-style-editor',
    plugins_url($editor_style, __FILE__),
    array(),
    '1.0.0'
  );

  if (!is_admin()) {
    wp_register_script(
      'slider-block-script-front',
      plugins_url($front_script, __FILE__),
      [],
      '1.0.0'
    );
    wp_register_style(
      'slider-block-style-front',
      plugins_url($front_style, __FILE__),
      [],
      '1.0.0'
    );
  }

  register_block_type('frn-seara-internacional/slider', array(
    'editor_script' => 'slider-block-script-editor',
    'editor_style' => 'slider-block-style-editor',
    'style' => 'slider-block-style-front',
    'script' => 'slider-block-script-front',
  ));

  add_filter('block_categories_all', function ($categories) {
    $categories[] = array(
      'slug'  => 'custom-blocks',
      'title' => 'Custom Blocks'
    );

    return $categories;
  });
}
add_action('init', 'slider_block');
