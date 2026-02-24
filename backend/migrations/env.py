from logging.config import fileConfig
import os

from sqlalchemy import create_engine, pool
from alembic import context

# Alembic Config, даёт доступ к значениям из .ini
config = context.config

# Логирование из alembic.ini
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Берём DATABASE_URL из окружения (как в app/db.py)
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")


def run_migrations_offline() -> None:
    """
    Run migrations in 'offline' mode.
    """
    url = DATABASE_URL
    context.configure(
        url=url,
        target_metadata=None,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode.
    """
    connectable = create_engine(
        DATABASE_URL,
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=None,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
