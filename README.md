# Timeline-Patient

## Setup environnement variables

First of all, environnement variables need to be set.
Start by creating a `.env` file located at the root of the project. Copy in it the content of `.env.template` file.

Set each of the constant values.


## Setup Python virtual env

From the `/python` project folder.

```sh
python3 -m venv ./.venv

source ./.venv/bin/activate

pip install -r requirements.txt
```

## Start MinIO server

From the project root folder.

```docker-compose up```

NB: The MinIO server will have the credentials set in the `.env` file (ie `MINIO_ACCESS_KEY` & `MINIO_SECRET_KEY`)

## Launch script to setup fake documents

```sh
python3 python/main.sh
```

## Setup `DocumentReference` resource

All there is to do now is to set a new mapping `DocumentReference` (for instance in River). 

- Set its source table to `timeline_documents`.
- Plug the `content[0].attachment.url` attirbute to `timeline_documents.doc_url`
- Plug the `subject.identifier.value` attribute to `timeline_documents.patient_id`

You can check on the preview if everything is alright. 

Once it is, just launch a batch for this `DocumentReference` resource.

## Install App dependencies

```yarn install```

## Start App

```yarn start```