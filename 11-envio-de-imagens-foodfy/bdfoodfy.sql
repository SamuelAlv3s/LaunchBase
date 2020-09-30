CREATE TABLE chefs (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  avatar_url text,
  created_at timestamp DEFAULT 'now()'
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  chef_id int UNIQUE NOT NULL,
  title text NOT NULL,
  information text NOT NULL,
  created_at timestamp DEFAULT 'now()',
  ingredients TEXT[] NOT NULL,
  preparation TEXT[] NOT NULL
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name text,
  path text NOT NULL
);

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY,
  recipes_id integer,
  file_id integer
);

ALTER TABLE recipes ADD FOREIGN KEY (chef_id) REFERENCES chefs (id);

ALTER TABLE recipe_files ADD FOREIGN KEY (recipes_id) REFERENCES recipes (id);

ALTER TABLE recipe_files ADD FOREIGN KEY (file_id) REFERENCES files (id);
