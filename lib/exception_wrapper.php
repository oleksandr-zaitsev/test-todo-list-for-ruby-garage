<?php

class exception_wrapper extends Exception
{

    function __construct(string $message, int $code)
    {
        $message = "error occurred! {$message}";
        parent::__construct($message, $code);
        logger::write(
            "message: {$message}; code: {$code}",
            ($code == 403 ? 'auth_error' : 'server_error')
        );
    }

    function getHTTPCode()
    {
        http_response_code($this->getCode());
        exit;
    }

}