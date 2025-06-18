# First time run this command

## If you are using Postgres, make sure you have set up your DATABASE_URL or updated the config.py with your Postgres connection string.

Enter Flask shell -

```bash
flask shell
```

Then Run the following commands

```python
from app import db
db.create_all()
```
