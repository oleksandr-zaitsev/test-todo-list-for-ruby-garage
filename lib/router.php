<?php

class router
{

    protected $route;
    protected $action;
    protected $request = [];

    public function __construct(array $request)
    {
        $this->request = $request;
        $this->route  = validator::validate($request['route']  ?? null, __METHOD__ . ' route is empty',  400);
        $this->action = validator::validate($request['action'] ?? null, __METHOD__ . ' action is empty', 400);

        $this->request = array_diff_key($request, array('route', 'action'));
    }

    public function route()
    {
        $this->checkRequest($this->route, $this->action);
        $route = new $this->route($this->request);
        echo json_encode($route->{$this->action}());
        exit;
    }

    private function checkRequest($class, $method)
    {
        validator::validate(file_exists(APP_PATH . $class . ".php"), __METHOD__ . " route '{$class}' does not exists", 400);
        validator::validate(class_exists($class) && method_exists($class, $method), __METHOD__ . " incorrect action and/or route", 400);
    }

}