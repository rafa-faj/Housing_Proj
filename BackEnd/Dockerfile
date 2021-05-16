# syntax=docker/dockerfile:1
FROM python:3.7-buster
WORKDIR /Backend
COPY . .
RUN pip3 install -r config/requirements.txt 
RUN pip3 install -e . && python3 ./app/db/create_houses.py
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]