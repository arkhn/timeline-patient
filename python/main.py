import psycopg2

from prescription_generator import prescription_generator
from psycopg2 import *

# prescription_generator(output_path="./pdf.pdf")
"""
    host: postgres
    port: 5432
    db_name: datalake
    db_schema: public
    username: datalake
    password: aEb74sdEspfSQFqZdkqz6TiBVNeNQB
"""

conn = psycopg2.connect(host="51.15.234.224", database="datalake",
                        user="datalake",
                        password="aEb74sdEspfSQFqZdkqz6TiBVNeNQB", port="5432")

cur = conn.cursor()

try:
    cur.execute(
        "CREATE TABLE timeline_documents (patient_id INT PRIMARY KEY NOT NULL, doc_name VARCHAR(30), "
        "file_url VARCHAR(100))")
except Exception as error:
    print(error)

cur.execute("SELECT instance_id FROM osiris_patient;")
for patient_id in cur:
    cur.execute("INSERT INTO timeline_documents(patient_id, doc_name) VALUES (%s, %s) RETURNING patient_id", (patient_id, "toto.pdf"))
    print(patient_id)
