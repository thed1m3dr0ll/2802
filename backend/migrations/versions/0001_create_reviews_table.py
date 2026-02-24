from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "0001_create_reviews_table"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("author", sa.Text, nullable=False),
        sa.Column("source", sa.Text, nullable=False),  # "yandex" | "2gis" | "site"
        sa.Column("rating", sa.Integer, nullable=False),
        sa.Column("text", sa.Text, nullable=False),
        sa.Column("date", sa.Date, nullable=False),
        schema="public",
    )
    op.create_index(
        "reviews_author_date_idx",
        "reviews",
        ["author", "date"],
        unique=False,
        schema="public",
    )


def downgrade() -> None:
    op.drop_index(
        "reviews_author_date_idx",
        table_name="reviews",
        schema="public",
    )
    op.drop_table("reviews", schema="public")
