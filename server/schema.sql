-- Enable Row Level Security (RLS)
-- Note: This schema assumes PostgreSQL 12+

-- 1. Create user_profiles table (Admin users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create applicants table
CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    state VARCHAR(100),
    district VARCHAR(100),
    position VARCHAR(255),
    qualification VARCHAR(255),
    experience TEXT,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    resume_url TEXT,
    aadhaar_url TEXT,
    photo_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    type VARCHAR(100),
    location VARCHAR(255),
    salary VARCHAR(100),
    description TEXT,
    organization VARCHAR(255),
    contact VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    email VARCHAR(255),
    city VARCHAR(100),
    resume_url TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create legal_documents table
CREATE TABLE IF NOT EXISTS legal_documents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by INTEGER REFERENCES user_profiles(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(100),
    image_url TEXT NOT NULL,
    uploaded_by INTEGER REFERENCES user_profiles(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Example RLS Policies (Assuming a role-based setup where 'admin' has full access)
-- Note: In a real app, you might use Supabase or custom current_user settings for RLS.
-- Here we provide basic policies.

-- Public can insert applicants
CREATE POLICY "Public can insert applicants" ON applicants
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Admins can do everything on applicants
CREATE POLICY "Admins can manage applicants" ON applicants
    FOR ALL
    USING (current_user = 'admin');

-- Public can view approved jobs
CREATE POLICY "Public can view approved jobs" ON jobs
    FOR SELECT
    TO public
    USING (status = 'approved');

-- Admins can manage jobs
CREATE POLICY "Admins can manage jobs" ON jobs
    FOR ALL
    USING (current_user = 'admin');

-- Public can insert applications
CREATE POLICY "Public can insert applications" ON applications
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Admins can manage applications
CREATE POLICY "Admins can manage applications" ON applications
    FOR ALL
    USING (current_user = 'admin');

-- Public can view legal documents
CREATE POLICY "Public can view legal documents" ON legal_documents
    FOR SELECT
    TO public
    USING (true);

-- Admins can manage legal documents
CREATE POLICY "Admins can manage legal documents" ON legal_documents
    FOR ALL
    USING (current_user = 'admin');

-- Public can view gallery images
CREATE POLICY "Public can view gallery images" ON gallery_images
    FOR SELECT
    TO public
    USING (true);

-- Admins can manage gallery images
CREATE POLICY "Admins can manage gallery images" ON gallery_images
    FOR ALL
    USING (current_user = 'admin');
