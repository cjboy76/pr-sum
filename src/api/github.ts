import { graphql } from '@/gql'

export const UserQuery = graphql(`
    query User{
        viewer {
            login
        }
    }
`)

export const ContributionsQuery = graphql(`
  query Contributions($from: DateTime!, $to: DateTime!, $size: Int = 50) {
    viewer {
        contributionsCollection(from: $from, to: $to) {
            pullRequestContributionsByRepository {
                repository {
                    name
                    nameWithOwner
                    isPrivate
                    owner {
                        login
                    }
                }
                contributions(first: $size) {
                    nodes {
                        pullRequest {
                            title
                            state
                            updatedAt
                            url
                            author {
                                login
                            }
                            id
                        }
                    }
                }
            }
        }
    }
  }
`)
