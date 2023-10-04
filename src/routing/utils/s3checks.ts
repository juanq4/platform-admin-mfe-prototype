import type { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { ErrorMessage, ServerError } from "../definitions";

const s3 = new S3Client({ region: "us-east-1", apiVersion: "2006-03-01" });
const options = {
  Bucket: "connect.dev.q4inc.com",
  Delimiter: "/", // list root content
};

export const listS3Objects = async (): Promise<ListObjectsV2CommandOutput> => {
  return await s3.send(new ListObjectsV2Command(options));
};

export const versionExistsInBucket = async (version: string): Promise<boolean> => {
  try {
    const bucket = await listS3Objects();
    if (!bucket) throw new ServerError(ErrorMessage.MissingS3Bucket);

    // check folders
    const { CommonPrefixes } = bucket;
    if (!CommonPrefixes?.length) throw new ServerError(ErrorMessage.MissingS3BucketContent);

    return CommonPrefixes.some(({ Prefix: Key }) => Key?.startsWith(`${version}/`));
  } catch (e) {
    console.error((e as Error)?.message);
    return false;
  }
};
