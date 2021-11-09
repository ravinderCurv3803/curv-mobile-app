import { gql } from '@apollo/client'

export const CREATEUSER_MUTATION = gql`
mutation CreateUser($input: data!) {
  createUser(input: $input) {
    fullName
    gender
    perfix
    phone
    email
    photo
    bio
    social {
      instagram
      youtube
      tiktok
      twitter
    }
    status
  }
}
`

export const LOGIN_MUTATION = gql`
mutation CheckUser($input: data!) {
  checkUser(input: $input) {
    fullName
    perfix
    phone
    email
    gender
    photo
    bio
    social {
      instagram
      youtube
      tiktok
      twitter
    }
    status
  }
}
`




