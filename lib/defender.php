<?php

class defender
{
    const INPUT = true;
    const OUTPUT = false;

    public static function clear($data, bool $encode)
    {
        if (empty($data)) {
            return $data;
        }
        switch (gettype($data)) {
            case 'array':
                $clear_arr = [];
                foreach ($data as $index => $row) {
                    $clear_arr[$index] = self::clear($row, $encode);
                }
                return $clear_arr;
                break;
            case 'string':
                $cleared = trim(preg_replace(
                    array('/(?:\s|\n|\r|<|>)+/S', '/(?:`|\')+/S'),
                    array(' ', '"'),
                    strip_tags($data)
                ));
                if ($encode) {
                    $cleared = htmlspecialchars($cleared);
                } else {
                    $cleared = htmlspecialchars_decode($cleared);
                }
                return $cleared;
                break;
            default:
                return $data;
                break;
        }
    }

}