CREATE TABLE users (
  user_id uuid PRIMARY KEY,
  username text NOT NULL,
  email text NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE posts (
  post_id integer PRIMARY KEY,
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  content text NOT NULL,
  image_url text,
  location text,
  country text,
  language text DEFAULT 'de',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE likes (
  like_id integer PRIMARY KEY,
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  post_id integer REFERENCES posts(post_id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

CREATE TABLE comments (
  comment_id integer PRIMARY KEY,
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  post_id integer REFERENCES posts(post_id) ON DELETE CASCADE,
  content text NOT NULL,
  language text DEFAULT 'de',
  created_at timestamptz DEFAULT now()
);
