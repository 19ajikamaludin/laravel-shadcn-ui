<?php

use Illuminate\Support\Number;

if (!function_exists('splitPascalCase')) {
    function splitPascalCase($string)
    {
        $word = '';
        // Use a regular expression to insert a space before each capital letter except the first one
        $splitString = preg_replace('/(?<!^)([A-Z])/', ' $1', $string);
        foreach (explode(' ', $splitString) as $index => $s) {
            if ($index == 0) {
                $word .= $s;

                continue;
            }
            $word .= '-' . $s;
        }

        return $word;
    }
}

if (!function_exists('get_php_path')) {
    function get_php_path(): ?string
    {
        return PHP_BINARY;
    }
}

if (!function_exists('formatIDR')) {
    function formatIDR($number)
    {
        $number = (float) $number;
        return Number::format($number, 0, locale: 'id-ID');
    }
}
