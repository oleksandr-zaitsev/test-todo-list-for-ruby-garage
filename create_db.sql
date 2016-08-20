CREATE TABLE public.login_registry  (
	session_id	varchar(32) NOT NULL,
	login     	varchar(256) NOT NULL,
	PRIMARY KEY(session_id,login)
);
CREATE TABLE public.projects  (
	id      	char(32) NOT NULL,
	position	int4 NOT NULL,
	owner   	varchar(256) NOT NULL,
	name    	varchar(512) NOT NULL,
	PRIMARY KEY(id)
);
CREATE TABLE public.tasks  (
	project_id	char(32) NOT NULL,
	position  	int4 NOT NULL,
	completed 	bool NOT NULL,
	content   	varchar(512) NOT NULL,
	PRIMARY KEY(project_id,position)
);
CREATE TABLE public.users  (
	login	varchar(256) NOT NULL,
	pass 	varchar(256) NOT NULL,
	PRIMARY KEY(login)
);