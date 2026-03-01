"""add name to bot_users

Revision ID: f9ba72050426
Revises: 74677a3e00c4
Create Date: 2026-03-01 18:36:44.514314
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f9ba72050426"
down_revision = "74677a3e00c4"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "bot_users",
        sa.Column("name", sa.Text(), nullable=True),
        schema="public",
    )


def downgrade() -> None:
    op.drop_column(
        "bot_users",
        "name",
        schema="public",
    )
