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

if (! function_exists('generateCodeFromString')) {
    function generateCodeFromString($string)
    {
        $code = strtoupper(collect(explode(' ', $string))
            ->filter()
            ->map(fn ($word) => mb_substr($word, 0, 1))
            ->implode(''));

        return $code;
    }
}

if (! function_exists('formatNumZero')) {
    function formatNumZero($n, $max = 6) // 0000001
    {
        $number = '';
        foreach (range(0, $max - strlen($n)) as $_) {
            $number .= '0';
        }

        return $number.$n;
    }
}

if (! function_exists('numberToRoman')) {
    function numberToRoman($number)
    {
        $romans = [
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X',
            11 => 'XI',
            12 => 'XII',
        ];

        return $romans[$number] ?? '';
    }
}

if (! function_exists('throw_validation_add_errors')) {
    function throw_validation_add_errors($errors)
    {
        throw \Illuminate\Validation\ValidationException::withMessages($errors);
    }
}

if (! function_exists('join_strings')) {
    function join_strings($strings, $glue = ' | ')
    {
        return collect($strings)
            ->filter(fn ($s) => empty($s) == false)
            ->join($glue);
    }
}
