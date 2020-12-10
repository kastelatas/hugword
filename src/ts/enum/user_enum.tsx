export enum UserType {
  Client = 1,
  Ambassador = 2
}

export enum UserTypeName {
  Client = 'client',
  Ambassador = 'ambassador'
}

export const UserTypeToString = {
  1: 'client',
  2: 'ambassador',
  'undefined' : 'ambassador'
}

export const UserTypeConvertTooUrl = {
  2: 'client',
  1: 'ambassador',
  'undefined' : 'ambassador'
}

export const UserTypeConvertTooId = {
  2: 'client_id',
  1: 'ambassador_id'
}