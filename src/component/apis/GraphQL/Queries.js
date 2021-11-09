import { gql } from '@apollo/client'

export const GET_SUBMISSION_QUERY = gql`
  query getAllSubmissions($userId: String!, $limit: Int, $offset: Int) {
    getAllSubmissions(userId: $userId, limit :$limit, offset: $offset) {
      total
      submissions  {
        id
        organisation {
          id
          name
        }
        competition {
          id
          name
        }
        category {
          id
          name
        }
        team {
          id
          name
        }
        opponent {
          id
          name
        }
        gameDate
        timezone
        submissionStatus
        video {
          videoId
          videoUrl
        }
        events {
          action
          time
          id
          players {
            position
            playerId
            firstName
            lastName
            squadNumber
          }
        }
      }
    }
  }
`