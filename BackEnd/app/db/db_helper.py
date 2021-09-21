from sqlalchemy import cast, Integer, select
from sqlalchemy.orm import sessionmaker
from database_setup import Room, Base
from sqlalchemy import create_engine
from crud import remove_all
from alembic import op
from alembic.migration import MigrationContext
from alembic.operations import Operations


def upgrade(engine):
    # ...
    conn = engine.connect()
    ctx = MigrationContext.configure(conn)
    op = Operations(ctx)
    with op.batch_alter_table('room') as batch_op:
        print(batch_op.alter_column('utility', type_=Integer(), nullable=True))


# def downgrade():
#     # ...
#     op.alter_column('downloads', 'size', existing_type=sa.BigInteger(), type_=sa.Integer())


if __name__ == "__main__":
    engine = create_engine("sqlite:///app/db/housing.db")
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    print(remove_all(Room, session))
