"""add preferred_staff_id to bot_users

Revision ID: 74677a3e00c4
Revises: 0003_create_bot_users_table
Create Date: 2026-03-01 14:05:09.509122
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "74677a3e00c4"
down_revision = "0003_create_bot_users_table"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "bot_users",
        sa.Column("preferred_staff_id", sa.Integer(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("bot_users", "preferred_staff_id")
