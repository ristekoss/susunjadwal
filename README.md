# Susun Jadwal Backend

## Requirements

1. Ensure `python` and `pip` are installed
2. Create virtual environment using `python3 -m venv env`
3. Activate virtualenv `source ./env/bin/activate`
4. `pip install -r requirements.txt`
5. Run `FLASK_ENV="development" flask run`

## Configuration

### Development

MongoDB using docker:
`docker run --rm -d -p 27017:27017 --name=test-mongo mongo`

Stop database:
`docker stop test-name`

By default, Flask access MongoDB on `localhost:27017` with database name `test`.

### Production

Coming soon.

## License

See LICENSE.md. This software actually goes a long way back, thank you so much to everyone involved.
