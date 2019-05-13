import { Storage } from "aws-amplify";
import awsconfig from "../aws-exports";

Storage.configure(awsconfig);

export async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    const stored = await Storage.put(filename, file, {
        contentType: file.type
    });

    return stored.key;
}
