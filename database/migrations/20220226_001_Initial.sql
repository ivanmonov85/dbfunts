/* psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'dbfunts'" | grep -q 1 | psql -U postgres -c "CREATE DATABASE dbfunts" */

CREATE TABLE IF NOT EXISTS public."Users" (
    "id" bigint NOT NULL,
    "name" text NOT NULL,
    "username" text NOT NULL,
    "eMail" text NOT NULL,
    "phone" text,
    "website" text,
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz,
    CONSTRAINT PK_Users PRIMARY KEY ("id"),
    CONSTRAINT UK_Users_username UNIQUE ("username")
) WITH (OIDS = FALSE);
