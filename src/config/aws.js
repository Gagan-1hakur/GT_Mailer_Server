import { SES, SESClient } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAU72LF5OSSXZZDGAN",
    secretAccessKey: "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",
  },
});
// const ses = new SES({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "AKIAU72LF5OSSJQMH473",
//     secretAccessKey: "BHnHOVs6opEsvxYWVK2SteXzRjsg8YIZ6vdbXl55YjDP",
//   },
// });

export default ses;
