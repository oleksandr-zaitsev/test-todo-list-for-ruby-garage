<?php

class auth {

    public function __construct(array $request)
    {
        $this->request = $request;
    }

    public function check() : array
    {
        $is_logged = false;

        $login = session_wrapper::get('login');
        $session_id = session_wrapper::getSessionId();

        if($login && $session_id){
            $sql = "select count(*) as cnt
                    from ".DB_SCHEMA.".login_registry a
                    join ".DB_SCHEMA.".users b
                        on a.login = b.login
                    where a.session_id = $1
                        and a.login = $2";
            $result = db_wrapper::query($sql, [$session_id, $login]);
            $is_logged = (int)($result[0]['cnt'] ?? 0) > 0;
        }

        return ['is_logged'=>$is_logged];
    }

    public function signIn() : array
    {
        $is_logged = false;

        $data = validator::handleRequest($this->request, ['login', 'password'], __METHOD__);
        validator::validate(preg_match(EMAIL_PATTERN, $data['login']), __METHOD__ . ' email must be valid', 400);

        $pass = $this->getPass($data['login']);

        if($pass && password_verify($data['password'], $pass)){
            $this->registerVisit($data['login']);
            session_wrapper::set('login', $data['login']);
            $is_logged = true;
        }

        return ['is_logged'=>$is_logged];
    }

    public function signUp() : array
    {
        $is_logged = false;
        $data = validator::handleRequest($this->request, ['login', 'password', 'confirm_password'], __METHOD__);
        validator::validate($data['password'] === $data['confirm_password'], __METHOD__ . ' password and confirm_password must be equal', 400);
        validator::validate(preg_match(EMAIL_PATTERN, $data['login']), __METHOD__ . ' email must be valid', 400);

        if(!$this->getPass($data['login'])){
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
            $sql = "insert into ".DB_SCHEMA.".users (login, pass)
                    values ($1, $2)";
            db_wrapper::query($sql, [$data['login'], $data['password']]);

            $this->registerVisit($data['login']);

            session_wrapper::set('login', $data['login']);
            $is_logged = true;
        }

        return ['is_logged'=>$is_logged];
    }

    public function logout() : array
    {
        $login = session_wrapper::get('login');
        $session_id = session_wrapper::getSessionId();

        $sql = "delete from ".DB_SCHEMA.".login_registry
                where session_id = $1 and login = $2";
        db_wrapper::query($sql, [$session_id, $login]);

        session_wrapper::destroySession();
        return ['is_logged'=>'false'];
    }

    private function getPass(string $login)
    {
        $sql = "select pass
                from ".DB_SCHEMA.".users
                where login = $1";
        $result = db_wrapper::query($sql, [$login]);
        return $result[0]['pass'] ?? null;
    }

    private function registerVisit(string $login){
        $sql = "delete from ".DB_SCHEMA.".login_registry
                where login = $1";
        db_wrapper::query($sql, [$login]);

        $session_id = session_wrapper::getSessionId();
        $sql = "insert into ".DB_SCHEMA.".login_registry (session_id, login)
                    values ($1, $2)";
        db_wrapper::query($sql, [$session_id, $login]);
    }

}
