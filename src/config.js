export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-west-1",
        BUCKET: "notes-app-api-prod-serverlessdeploymentbucket-fg9e04iugt6y"
    },
    apiGateway: {
        REGION: "us-west-1",
        URL: "https://69fnwnksa6.execute-api.us-west-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_mGm4PXwj1",
        APP_CLIENT_ID: "2j73sgnakf252iqjs5d9rqc232",
        IDENTITY_POOL_ID: "us-east-1_mGm4PXwj1"
    }
};