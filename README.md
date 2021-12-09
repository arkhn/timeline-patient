# Timeline-Patient

## Start MinIO server

```docker-compose up```

## Setup `documents` Buckets

Once MinIO server is launched, go to `http://localhost:9001` and login with the credentials

```
Username: minio
Password: minio123
```

Then, go to `Buckets -> Create Bucket` and set your bucket name as `documents` or whatever you want.

Go to the `manage` menu of your freshly created bucket and set its access policy to `Public`

You can then populate your bucket with any kind of PDF.

## Setup `DocumentReference` resource

In order to make PDF viewing available from `DocumentReference` resources, you'll have to set a value for `content[0].attachment.url` attribute. This url should respect this pattern : `http://localhost:9000/[yourBucketName]/[yourPDFName]`. Do not forget the `.pdf` extension.

## Install App dependencies

```yarn install```

## Start App

```yarn start```