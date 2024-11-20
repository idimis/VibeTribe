-- Create the schema if it does not exist
CREATE SCHEMA IF NOT EXISTS vibetribe;

-- Set the default schema for the session
SET search_path TO vibetribe;

-- Create location table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'location') THEN
        CREATE TABLE location (
            id SERIAL PRIMARY KEY,
            city_or_district VARCHAR NOT NULL
        );
    END IF;
END $$;

-- Create user table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'user') THEN
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
    END IF;
END $$;

-- Create event table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'event') THEN
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
    END IF;
END $$;

-- Create point table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'point') THEN
        CREATE TABLE point (
            id SERIAL PRIMARY KEY,
            customer_id INTEGER NOT NULL,
            points INTEGER,
            expires_at TIMESTAMP,
            created_at TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES "user"(id)
        );
    END IF;
END $$;

-- Create transaction table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'transaction') THEN
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
    END IF;
END $$;

-- Create review table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'review') THEN
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
    END IF;
END $$;

-- Create referral table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'referral') THEN
        CREATE TABLE referral (
            id SERIAL PRIMARY KEY,
            referral_code VARCHAR,
            referrer_id INTEGER,
            referred_id INTEGER,
            created_at TIMESTAMP,
            FOREIGN KEY (referral_code) REFERENCES "user"(referral_code)
        );
    END IF;
END $$;

-- Create voucher table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'voucher') THEN
        CREATE TABLE voucher (
            id SERIAL PRIMARY KEY,
            event_id INTEGER,
            customer_id INTEGER,
            voucher_code VARCHAR UNIQUE,
            voucher_value NUMERIC(15, 2),
            description TEXT,
            voucher_type VARCHAR,
            expires_at DATE,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES event(id),
            FOREIGN KEY (customer_id) REFERENCES "user"(id)
        );
    END IF;
END $$;

-- Create quantity_based_voucher table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'quantity_based_voucher') THEN
        CREATE TABLE quantity_based_voucher (
            voucher_id INTEGER PRIMARY KEY,
            quantity_limit INTEGER,
            FOREIGN KEY (voucher_id) REFERENCES voucher(id)
        );
    END IF;
END $$;

-- Create date_range_based_voucher table if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'vibetribe' AND tablename = 'date_range_based_voucher') THEN
        CREATE TABLE date_range_based_voucher (
            voucher_id INTEGER PRIMARY KEY,
            start_date DATE,
            end_date DATE,
            FOREIGN KEY (voucher_id) REFERENCES voucher(id)
        );
    END IF;
END $$;