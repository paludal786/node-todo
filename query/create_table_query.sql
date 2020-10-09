CREATE TABLE public.todo
(
	id                bigint NOT NULL,
  firstname         text NOT NULL,
  lastname          text NOT NULL,
  email             varchar(100) NOT NULL DEFAULT '',
  gender            text NOT NULL,
  mobile            varchar(10) NOT NULL DEFAULT '',
  updatedon         timestamp(0) NOT NULL,
  is_deleted        integer NOT NULL,
  constraint check_gender check (gender in ('Male', 'Female')), 
  constraint check_deleted check (is_deleted in (0,1))
)