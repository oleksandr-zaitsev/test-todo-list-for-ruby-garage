<?php

try{
    $input = json_decode(file_get_contents('php://input'), true);
    $params = !empty($input) ? $input : $_REQUEST;
    registry::setData('REQUEST', defender::clear($params, defender::INPUT));

    $router = new router(registry::getData('REQUEST'));
    $router->route();
} catch(exception_wrapper $e){
    $e->getHTTPCode();
}
