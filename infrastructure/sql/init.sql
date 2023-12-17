CREATE TABLE public.person (
    person_id SERIAL PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    person_email VARCHAR(255) NOT NULL,
    person_phone VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.user (
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    person_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES person(person_id)
);

CREATE TABLE public.tag (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL,
    tag_color VARCHAR(9),  -- Length adjusted for potential RGBA hex codes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.task_status (
    task_status_id SERIAL PRIMARY KEY,
    task_status_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.task (
    task_id SERIAL PRIMARY KEY,
    task_description TEXT,
    task_title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    person_id INT,
    task_status_id INT,
    FOREIGN KEY (person_id) REFERENCES person(person_id),
    FOREIGN KEY (task_status_id) REFERENCES task_status(task_status_id)
);

CREATE TABLE public.task_tag (
    task_id INT,
    tag_id INT,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES task(task_id),
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
);

-- Adding initial data to the database
INSERT INTO task_status (task_status_name) VALUES
('On hold'),
('Not Started'),
('In Progress'),
('Completed');

INSERT INTO "tag" (tag_name, tag_color) VALUES
('Urgent', '#FF0000'),      -- Red color for Urgent
('High Priority', '#FFA500'), -- Orange color for High Priority
('Medium Priority', '#FFFF00'), -- Yellow color for Medium Priority
('Low Priority', '#008000'); -- Green color for Low Priority

INSERT INTO "user" (user_login, user_password, person_id) VALUES
('hugomoraes_@hotmail.com', '01fff2ef1ce8881908fac918feca78bf', null);

INSERT INTO "person" (person_name, person_email, person_phone) VALUES
('Hugo Moraes Bonatto', 'hugomoraes_@hotmail.com', '51999999999');

UPDATE "user" SET person_id = 1 WHERE user_id = 1;

INSERT INTO "task" (task_description, task_title, person_id, task_status_id) VALUES
('This is a test task', 'Test Task', 1, 1),
('This is a test task 2', 'Test Task 2', 1, 2),
('This is a test task 3', 'Test Task 3', 1, 3),
('This is a test task 4', 'Test Task 4', 1, 4);

INSERT INTO "task_tag" (task_id, tag_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4);


