-- Create the schema if it does not exist
CREATE SCHEMA IF NOT EXISTS vibetribe;

-- Set the default schema for the session
SET search_path TO vibetribe;

-- Create user table
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  photo_profile_url VARCHAR,
  referral_code VARCHAR UNIQUE,
  points_balance INTEGER DEFAULT 0,
  role VARCHAR NOT NULL,
  website VARCHAR,
  phone_number VARCHAR,
  address VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Create event table
CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  organizer_id INTEGER NOT NULL,
  image_url VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  location VARCHAR NOT NULL,
  location_details VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  fee NUMERIC(15, 2) NOT NULL,
  available_seats INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  FOREIGN KEY (organizer_id) REFERENCES "user"(id)
);

-- Create point table
CREATE TABLE point (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  points INTEGER,
  expires_at TIMESTAMP,
  created_at TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES "user"(id)
);

-- Create transaction table
CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  amount_paid NUMERIC(15, 2) NOT NULL,
  discount_applied NUMERIC(15, 2),
  created_at TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES "user"(id),
  FOREIGN KEY (event_id) REFERENCES event(id)
);

-- Create review table
CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  rating INTEGER,
  review TEXT,
  created_at TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES "user"(id),
  FOREIGN KEY (event_id) REFERENCES event(id)
);

-- Create referral table
CREATE TABLE referral (
  id SERIAL PRIMARY KEY,
  referral_code VARCHAR,
  referrer_id INTEGER,
  referred_id INTEGER,
  created_at TIMESTAMP,
  FOREIGN KEY (referral_code) REFERENCES "user"(referral_code)
);

-- Create voucher table
CREATE TABLE voucher (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  voucher_code VARCHAR UNIQUE,
  voucher_value NUMERIC(15, 2),
  description TEXT,
  voucher_type VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES event(id)
);

-- Create quantity_based_voucher table
CREATE TABLE quantity_based_voucher (
  voucher_id INTEGER PRIMARY KEY,
  quantity_limit INTEGER,
  FOREIGN KEY (voucher_id) REFERENCES voucher(id)
);

-- Create date_range_based_voucher table
CREATE TABLE date_range_based_voucher (
  voucher_id INTEGER PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (voucher_id) REFERENCES voucher(id)
);
