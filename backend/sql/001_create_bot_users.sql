CREATE TABLE IF NOT EXISTS public.bot_users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT NOT NULL UNIQUE,
    tone TEXT NOT NULL DEFAULT 'neutral',
    preferred_master_id INTEGER
);
