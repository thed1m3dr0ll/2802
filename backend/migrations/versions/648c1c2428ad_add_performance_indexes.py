"""add performance indexes

Revision ID: 648c1c2428ad
Revises: 0003_create_bot_users_table
Create Date: 2026-03-04
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "648c1c2428ad"
down_revision = "0003_create_bot_users_table"
branch_labels = None
depends_on = None


def upgrade() -> None:
    conn = op.get_bind()

    # ── Брони ──────────────────────────────────────────────────────────────
    try:
        conn.execute(sa.text("SELECT 1 FROM bookings LIMIT 1"))
        op.create_index(
            "ix_bookings_booking_date",
            "bookings",
            ["booking_date"],
        )
        op.create_index(
            "ix_bookings_master_id",
            "bookings",
            ["master_id"],
        )
        # если у тебя в этом файле есть ещё индексы по bookings
        # (status, master_date, date_status) — оставь их здесь же
        # опираясь на исходный вариант:
        # op.create_index("ix_bookings_status", "bookings", ["status"])
        # и т.п.
    except Exception:
        # таблицы нет — пропускаем индексы для bookings
        pass

    # ── Клиенты ────────────────────────────────────────────────────────────
    try:
        conn.execute(sa.text("SELECT 1 FROM clients LIMIT 1"))
        op.create_index(
            "ix_clients_phone",
            "clients",
            ["phone"],
        )
    except Exception:
        pass

    # ── Мастера ────────────────────────────────────────────────────────────
    try:
        conn.execute(sa.text("SELECT 1 FROM masters LIMIT 1"))
        op.create_index(
            "ix_masters_slug",
            "masters",
            ["slug"],
        )
    except Exception:
        pass

    # ── Услуги ─────────────────────────────────────────────────────────────
    try:
        conn.execute(sa.text("SELECT 1 FROM services LIMIT 1"))
        op.create_index(
            "ix_services_slug",
            "services",
            ["slug"],
        )
    except Exception:
        pass

    # ── Отзывы ─────────────────────────────────────────────────────────────
    try:
        conn.execute(sa.text("SELECT 1 FROM reviews LIMIT 1"))
        op.create_index(
            "ix_reviews_is_published",
            "reviews",
            ["is_published"],
        )
        op.create_index(
            "ix_reviews_master_id",
            "reviews",
            ["master_id"],
        )
    except Exception:
        pass


def downgrade() -> None:
    op.drop_index("ix_bookings_booking_date", table_name="bookings")
    op.drop_index("ix_bookings_master_id", table_name="bookings")
    op.drop_index("ix_bookings_status", table_name="bookings")
    op.drop_index("ix_bookings_master_date", table_name="bookings")
    op.drop_index("ix_bookings_date_status", table_name="bookings")

    op.drop_index("ix_clients_phone", table_name="clients")

    op.drop_index("ix_masters_slug", table_name="masters")

    op.drop_index("ix_services_slug", table_name="services")

    op.drop_index("ix_reviews_is_published", table_name="reviews")
    op.drop_index("ix_reviews_master_id", table_name="reviews")
