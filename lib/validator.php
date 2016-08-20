<?php

class validator
{

    public static function validate($var,string $message,int $code)
    {
        if (empty($var)) {
            throw new exception_wrapper ($message, $code);
        }
        return $var;
    }

    public static function handleRequest(array $request, array $mandatory,string $context) : array
    {
        self::validate($request, "$context request array is empty", 400);
        self::validate($mandatory, "$context mandatory array is empty", 500);
        $answer = [];
        foreach ($mandatory as $param) {
            self::validate(!empty($request[$param]), "$context $param not found in request or empty", 400);
            $answer[$param] = $request[$param];
        }
        return $answer;
    }

}