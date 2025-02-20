import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';

export const removeTypenameLink = removeTypenameFromVariables();
