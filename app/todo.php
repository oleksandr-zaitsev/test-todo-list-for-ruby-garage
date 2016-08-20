<?php

class todo
{

    public function __construct(array $request)
    {
        $this->request = $request;
    }

    public function load() : array
    {
        $answer['projects'] = [];
        $login = session_wrapper::get('login');
        $session_id = session_wrapper::getSessionId();

        $sql = "select distinct a.id, a.name, a.position
                from ".DB_SCHEMA.".projects a,
                    ".DB_SCHEMA.".login_registry b,
                    ".DB_SCHEMA.".users c
                where a.owner = b.login
                    and a.owner = c.login
                    and b.session_id = $1
                    and a.owner = $2
                order by a.position";
        $projects = db_wrapper::query($sql, [$session_id, $login]);

        if(count($projects) > 0){
            foreach($projects as $idx_p => $project){
                $answer['projects'][$idx_p]['name'] = $project['name'];
                $answer['projects'][$idx_p]['position'] = (int)$project['position'];
                $sql = "select position, completed, content
                        from ".DB_SCHEMA.".tasks
                        where project_id = $1
                        order by position";
                $tasks = db_wrapper::query($sql, [$project['id']]);
                if(count($tasks) > 0){
                    foreach($tasks as $idx_t => $task){
                        $answer['projects'][$idx_p]['tasks'][$idx_t]['position'] = (int)$task['position'];
                        $answer['projects'][$idx_p]['tasks'][$idx_t]['completed'] = ($task['completed'] == 't');
                        $answer['projects'][$idx_p]['tasks'][$idx_t]['content'] = $task['content'];
                    }
                }
            }
        }

        return $answer;
    }

    public function save() : array
    {
        validator::validate(isset($this->request['projects']), __METHOD__ . ' projects not found in request', 400);
        $projects = $this->request['projects'];

        $login = session_wrapper::get('login');
        $session_id = session_wrapper::getSessionId();

        db_wrapper::beginTransaction();

        $sql = "delete from ".DB_SCHEMA.".tasks a
                using ".DB_SCHEMA.".projects b,
                    ".DB_SCHEMA.".login_registry c,
                    ".DB_SCHEMA.".users d
                where a.project_id = b.id
                    and b.owner = c.login
                    and b.owner = d.login
                    and b.owner = $1
                    and c.session_id = $2;";
        db_wrapper::query($sql, [$login, $session_id]);

        $sql = "delete from ".DB_SCHEMA.".projects a
                using ".DB_SCHEMA.".login_registry b,
                    ".DB_SCHEMA.".users c
                where a.owner = b.login
                    and a.owner = c.login
                    and a.owner = $1
                    and b.session_id = $2;";
        db_wrapper::query($sql, [$login, $session_id]);

        if(count($projects) > 0){
            foreach($projects as $project){
                validator::handleRequest($project, ['name','position'], __METHOD__);
                $project['id'] = helper::getUniqueId();

                $sql = "insert into ".DB_SCHEMA.".projects (id, position, owner, name)
                        values ($1, $2, $3, $4)";
                db_wrapper::query($sql, [$project['id'], $project['position'], $login, $project['name']]);

                $tasks = $project['tasks'] ?? [];
                if(count($tasks) > 0){
                    foreach($tasks as $task){
                        validator::handleRequest($task, ['content','position'], __METHOD__);
                        $task['completed'] = (bool)$task['completed'] ? 'true' : 'false';

                        $sql = "insert into ".DB_SCHEMA.".tasks (project_id, position, completed, content)
                                values ($1, $2, $3, $4)";
                        db_wrapper::query($sql, [$project['id'], $task['position'], $task['completed'], $task['content']]);
                    }
                }
            }
        }

        db_wrapper::commitTransaction();

        return $this->load();
    }
}