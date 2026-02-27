from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "0002_create_visits_table"
down_revision = "0001_create_reviews_table"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "visits",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer, nullable=False, index=True),
        sa.Column("datetime", sa.DateTime(timezone=True), nullable=False),
        sa.Column("duration_minutes", sa.Integer, nullable=False),
        sa.Column("master_name", sa.Text, nullable=False),
        sa.Column("service_name", sa.Text, nullable=False),
        sa.Column("status", sa.Text, nullable=False, index=True),
        sa.Column("comment", sa.Text, nullable=True),
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
    )

    op.create_foreign_key(
        "fk_visits_user_id_users",
        "visits",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint("fk_visits_user_id_users", "visits", type_="foreignkey")
    op.drop_table("visits")
