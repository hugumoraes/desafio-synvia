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
('Not Started'),
('In Progress'),
('Completed');

INSERT INTO "tag" (tag_name, tag_color) VALUES
('Urgent', '#FF0000'),      -- Red color for Urgent
('High Priority', '#FFA500'), -- Orange color for High Priority
('Medium Priority', '#FFFF00'), -- Yellow color for Medium Priority
('Low Priority', '#008000'); -- Green color for Low Priority

INSERT INTO "user" (user_login, user_password, person_id) VALUES
('hugo', '$2b$10$m08Y20C0r7hf8qhYYl9by.4TIZX5nRPKW4/NNjjg6vL6Jk.SYhvHS', null),
('joaquim', '$2b$10$m08Y20C0r7hf8qhYYl9by.4TIZX5nRPKW4/NNjjg6vL6Jk.SYhvHS', null),
('maria', '$2b$10$m08Y20C0r7hf8qhYYl9by.4TIZX5nRPKW4/NNjjg6vL6Jk.SYhvHS', null),
('leonardo', '$2b$10$m08Y20C0r7hf8qhYYl9by.4TIZX5nRPKW4/NNjjg6vL6Jk.SYhvHS', null);

INSERT INTO "person" (person_name, person_email, person_phone) VALUES
('Hugo', 'hugo@hotmail.com', '51999999999'),
('Joaquim', 'joaquim@hotmail.com', '51999999999'),
('Maria', 'maria@hotmail.com', '51999999999'),
('Leonardo', 'leonardo@hotmail.com', '51999999999');

UPDATE "user" SET person_id = 1 WHERE user_id = 1;
UPDATE "user" SET person_id = 2 WHERE user_id = 2;
UPDATE "user" SET person_id = 3 WHERE user_id = 3;
UPDATE "user" SET person_id = 4 WHERE user_id = 4;

INSERT INTO "task" (task_title, task_description, person_id, task_status_id) VALUES
('Clean up dishes', 'Quisque viverra, nunc tempus interdum gravida, velit velit dignissim elit, vel dictum augue elit eget tortor. Nam pharetra est quis ligula facilisis, rhoncus dapibus diam feugiat. Aliquam mattis posuere elementum. Vestibulum molestie vitae metus quis pellentesque. Proin condimentum massa sed nisi mattis bibendum. Curabitur ultricies enim nec vehicula tincidunt. Pellentesque commodo aliquam turpis, ut tincidunt leo feugiat ut. Nulla semper velit sit amet elit tristique, et vulputate nibh ullamcorper.', 1, 1),
('Take out the garbage', 'Vivamus sagittis tincidunt aliquam. Proin commodo sapien a ligula facilisis tempor. In congue tortor in velit consequat volutpat. Donec felis dui, tristique ut pulvinar nec, vulputate vitae turpis. Donec id nunc in ligula vehicula dignissim id accumsan nibh. Nullam a feugiat ipsum, eget scelerisque tortor. In fringilla rutrum dui non porta. Vestibulum mollis dictum libero eget tincidunt. Maecenas eget magna elementum, venenatis turpis vel, vestibulum ex.', 2, 2),
('Take a fast shower', 'Morbi vel cursus lacus, id mollis est. Aliquam eget posuere enim. Proin dui ante, imperdiet nec lorem in, viverra posuere metus. Etiam ac consequat massa. Sed pellentesque nunc quis tristique ullamcorper. Nam iaculis mi a elit luctus sagittis. Nulla at orci eget quam vehicula posuere id non est. Donec imperdiet turpis porta, ultricies urna non, rutrum sapien. Fusce hendrerit dictum diam, varius eleifend massa gravida sit amet. Praesent ut tellus risus. Quisque mauris justo, tempor in lacinia a, maximus eget ligula. Nunc enim urna, volutpat vel elit ac, malesuada iaculis sem.', 2, 3),
('Ring the bell', 'Phasellus bibendum massa risus, in blandit ante dignissim ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut suscipit libero, sit amet commodo augue. Pellentesque bibendum elementum sodales.', 1, 1);

INSERT INTO "task_tag" (task_id, tag_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4);


