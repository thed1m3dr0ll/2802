from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0003_create_bot_users_table"
down_revision = "0002_create_visits_table"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "bot_users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("telegram_id", sa.BigInteger, nullable=False, unique=True),
        sa.Column("phone", sa.Text, nullable=True),
        sa.Column("yclients_client_id", sa.Integer, nullable=True),
        sa.Column("tone", sa.Text, nullable=False, server_default="casual"),
        sa.Column("preferred_master", sa.Text, nullable=False, server_default="top"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        schema="public",
    )

    op.create_index(
        "bot_users_telegram_id_idx",
        "bot_users",
        ["telegram_id"],
        unique=True,
        schema="public",
    )

    op.create_index(
        "bot_users_yclients_client_id_idx",
        "bot_users",
        ["yclients_client_id"],
        unique=False,
        schema="public",
    )


def downgrade() -> None:
    op.drop_index(
        "bot_users_yclients_client_id_idx",
        table_name="bot_users",
        schema="public",
    )
    op.drop_index(
        "bot_users_telegram_id_idx",
        table_name="bot_users",
        schema="public",
    )
    op.drop_table("bot_users", schema="public")
