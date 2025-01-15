/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query User{\n        viewer {\n            login\n        }\n    }\n": types.UserDocument,
    "\n  query Contributions($from: DateTime!, $to: DateTime!, $size: Int = 50) {\n    viewer {\n        contributionsCollection(from: $from, to: $to) {\n            pullRequestContributionsByRepository {\n                repository {\n                    name\n                    nameWithOwner\n                    isPrivate\n                    owner {\n                        login\n                    }\n                }\n                contributions(first: $size) {\n                    nodes {\n                        pullRequest {\n                            title\n                            state\n                            updatedAt\n                            url\n                            body\n                            author {\n                                login\n                            }\n                            id\n                        }\n                    }\n                }\n            }\n        }\n    }\n  }\n": types.ContributionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query User{\n        viewer {\n            login\n        }\n    }\n"): (typeof documents)["\n    query User{\n        viewer {\n            login\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Contributions($from: DateTime!, $to: DateTime!, $size: Int = 50) {\n    viewer {\n        contributionsCollection(from: $from, to: $to) {\n            pullRequestContributionsByRepository {\n                repository {\n                    name\n                    nameWithOwner\n                    isPrivate\n                    owner {\n                        login\n                    }\n                }\n                contributions(first: $size) {\n                    nodes {\n                        pullRequest {\n                            title\n                            state\n                            updatedAt\n                            url\n                            body\n                            author {\n                                login\n                            }\n                            id\n                        }\n                    }\n                }\n            }\n        }\n    }\n  }\n"): (typeof documents)["\n  query Contributions($from: DateTime!, $to: DateTime!, $size: Int = 50) {\n    viewer {\n        contributionsCollection(from: $from, to: $to) {\n            pullRequestContributionsByRepository {\n                repository {\n                    name\n                    nameWithOwner\n                    isPrivate\n                    owner {\n                        login\n                    }\n                }\n                contributions(first: $size) {\n                    nodes {\n                        pullRequest {\n                            title\n                            state\n                            updatedAt\n                            url\n                            body\n                            author {\n                                login\n                            }\n                            id\n                        }\n                    }\n                }\n            }\n        }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;