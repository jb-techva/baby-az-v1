-- =========================================================================
-- Supabase PostgreSQL Schema for Baby AZ's 1st Birthday & Christening RSVPs
-- =========================================================================

-- 1. Create the rsvps table
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('attending', 'declined')),
    attendees_count INTEGER NOT NULL DEFAULT 0 CHECK (attendees_count >= 0 AND attendees_count <= 20),
    message TEXT,
    privacy_acknowledged BOOLEAN NOT NULL DEFAULT true,
    ip_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create indices for performance and duplicate prevention
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON public.rsvps (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON public.rsvps (status);
CREATE INDEX IF NOT EXISTS idx_rsvps_guest_name_lower ON public.rsvps (lower(trim(guest_name)));

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- 4. Security Policies
-- Privacy rule: Do NOT expose guest names or RSVP records publicly.
-- Public anon users CANNOT select/read from rsvps table.
DROP POLICY IF EXISTS "Deny public select on rsvps" ON public.rsvps;
CREATE POLICY "Deny public select on rsvps"
    ON public.rsvps
    FOR SELECT
    TO anon
    USING (false);

-- Only backend service role (or authenticated admin) can view all RSVPs
DROP POLICY IF EXISTS "Service role can manage all rsvps" ON public.rsvps;
CREATE POLICY "Service role can manage all rsvps"
    ON public.rsvps
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Optional: Allow direct insert with strict check if anon insertion is used directly from client,
-- but the application routes via the secure server-side /api/rsvp endpoint with service role.
DROP POLICY IF EXISTS "Allow anon inserts with valid data" ON public.rsvps;
CREATE POLICY "Allow anon inserts with valid data"
    ON public.rsvps
    FOR INSERT
    TO anon
    WITH CHECK (
        length(trim(guest_name)) >= 2 AND
        status IN ('attending', 'declined') AND
        privacy_acknowledged = true
    );

-- 5. Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trigger_rsvps_updated_at ON public.rsvps;
CREATE TRIGGER trigger_rsvps_updated_at
    BEFORE UPDATE ON public.rsvps
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- =========================================================================
-- HOW TO EXPORT CSV FROM SUPABASE TABLE EDITOR:
-- 1. In Supabase Dashboard, go to "Table Editor" -> select "rsvps" table.
-- 2. You will see columns: guest_name, status, attendees_count, message, created_at.
-- 3. Click the "Export" button in the top right corner of the table.
-- 4. Choose "Export to CSV" and save the file to your computer.
--
-- OR RUN THIS SQL QUERY in the SQL Editor to get a summarized list:
-- SELECT 
--     guest_name AS "Guest Name",
--     status AS "Status",
--     attendees_count AS "Total Guests",
--     message AS "Special Message / Wishes",
--     to_char(created_at, 'YYYY-MM-DD HH12:MI AM') AS "Submitted At"
-- FROM public.rsvps
-- ORDER BY created_at DESC;
-- =========================================================================
