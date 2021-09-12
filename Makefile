LANG = python3
FOLDER = homehub_backend
REQS = config/requirements.txt 
CREATE = app/db/create_houses.py
DOCKNAME = homehubbackend

nodock:
	cd BackEnd; \
	$(LANG) -m venv $(FOLDER) && \
	source $(FOLDER)/bin/activate && \
	pip install -r $(REQS) && \
	pip install -e . && \
	$(LANG) $(CREATE) && \
	$(LANG) -m flask run --host=0.0.0.0

dock:
	cd BackEnd; \
	docker build --tag $(DOCKNAME) . && \
	docker run -p 5000:5000 $(DOCKNAME)

front:
	cd FrontEnd; \
	npm run dev