#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username postgres --dbname postgres <<-EOSQL
  create extension if not exists "pg_trgm";
  create extension if not exists "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS btree_gist;
  select * FROM pg_extension;
EOSQL
