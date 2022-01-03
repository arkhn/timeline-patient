import os
import shutil
import uuid
import psycopg2
import glob
import json

from dotenv import load_dotenv

from minio import Minio
from minio.error import S3Error
from prescription_generator import prescription_generator

def create_timeline_document_table(sql_cursor):
    print("Creating 'timeline_documents' table in '{}' database...".format(
        POSTGRES_CREDENTIALS["database"]))
    sql_cursor.execute(
        "CREATE TABLE timeline_documents (patient_id INT PRIMARY KEY NOT NULL, doc_name VARCHAR(50), "
        "doc_url VARCHAR(100), CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES osiris_patient(patient_id))")
    print("Table 'timeline_documents' successfully created !\n")


# Load .env
load_dotenv()

# Constants setup
POSTGRES_CREDENTIALS = {
    "host": os.environ.get("POSTGRES_HOST"),
    "port": int(os.environ.get("POSTGRES_PORT")),
    "database": os.environ.get("POSTGRES_DB"),
    "user": os.environ.get("POSTGRES_LOGIN"),
    "password": os.environ.get("POSTGRES_PASSWORD"),
}

MINIO_CREDENTIALS = {
    "endpoint": os.environ.get("MINIO_ENDPOINT"),
    "access_key": os.environ.get("MINIO_ACCESS_KEY"),
    "secret_key": os.environ.get("MINIO_SECRET_KEY"),
}

BUCKET_NAME = os.environ.get("BUCKET_NAME", "documents")

# DB connect
try:
    print("Connecting to DB '{}' with user '{}'...".format(
        POSTGRES_CREDENTIALS["database"], POSTGRES_CREDENTIALS["user"]))
    conn = psycopg2.connect(**POSTGRES_CREDENTIALS)
    print("Connection SUCCESS\n")
except Exception as error:
    print(error)
    exit()

cur = conn.cursor()

# MinIO Connect
try:
    print("Connecting to MinIO server...")
    client = Minio(
        **MINIO_CREDENTIALS,
        secure=False
    )
    print("Connection SUCCESS\n")
except S3Error as error:
    print(error)
    exit()

# Bucket create/retrieve
found = client.bucket_exists(BUCKET_NAME)
if not found:
    print("Bucket '{}' does not exist yet, creating one...".format(BUCKET_NAME))
    client.make_bucket(BUCKET_NAME)
    print("Bucket '{}' successfully created\n".format(BUCKET_NAME))
else:
    print("Bucket '{}' already exists".format(BUCKET_NAME))
    print("Removing all items from bucket '{}'...".format(BUCKET_NAME))
    for item in client.list_objects(bucket_name=BUCKET_NAME):
        client.remove_object(BUCKET_NAME, item.object_name)
    print("Bucket '{}' has been successfully flushed !\n".format(BUCKET_NAME))


# Bucket policy management
# Anonymous read-only bucket policy
policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetBucketLocation", "s3:ListBucket"],
            "Resource": "arn:aws:s3:::{}".format(BUCKET_NAME),
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": "arn:aws:s3:::{}/*".format(BUCKET_NAME),
        },
    ],
}

try:
    print("Setting bucket '{}' policy to 'PUBLIC' & 'READ ONLY'".format(BUCKET_NAME))
    client.set_bucket_policy(BUCKET_NAME, json.dumps(policy))
    print("Bucket '{}' policy successfully updated\n".format(BUCKET_NAME))
except S3Error as error:
    print(error)


# Setup timeline_documents table
try:
    create_timeline_document_table(sql_cursor=cur)
except Exception as error:
    print(error)
    conn.commit()
    print("Dropping 'timeline_documents' table...")
    cur.execute("DROP TABLE timeline_documents")
    print("Table 'timeline_documents' successfully dropped !")
    create_timeline_document_table(sql_cursor=cur)


try:
    print("Reading 'osiris_patient' table, creating PDF files for each row, inserting new rows in 'timeline_documents' & uploading PDF files to MinIO...")
    cur.execute(
        "SELECT patient_id, patient_firstname, patient_familyname FROM osiris_patient")
    for row in cur.fetchall():
        patient_id, first_name, last_name = row
        document_name = "{}.pdf".format(uuid.uuid4())
        document_url = "http://{}/{}/{}".format(MINIO_CREDENTIALS["endpoint"],
                                                BUCKET_NAME, document_name)
        document_path = "./tmp/{}".format(document_name)
        prescription_generator(output_path=document_path,
                               first_name=first_name, last_name=last_name)

        cur.execute("INSERT INTO timeline_documents(patient_id, doc_name, doc_url) VALUES (%s, %s, %s) RETURNING patient_id",
                    (patient_id, document_name, document_url))
        client.fput_object(
            BUCKET_NAME, document_name, document_path,
        )
except Exception as error:
    print(error)

# Commit SQL operations
conn.commit()
conn.close()

# Delete remaining files from ./tmp
print("Removing /tmp folder")
# # Delete tmp folder
shutil.rmtree("./tmp")


print("Done")
