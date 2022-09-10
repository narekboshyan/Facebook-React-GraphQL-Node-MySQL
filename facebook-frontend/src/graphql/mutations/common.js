const { gql } = require('@apollo/client');

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: Upload!, $quotes: Boolean) {
    uploadFiles(files: $files, quotes: $quotes)
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String) {
    sendMessage(message: $message)
  }
`;
