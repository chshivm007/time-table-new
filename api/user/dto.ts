export interface UserAddressDto {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string
  }
}

export interface UserPostDto {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface UserCompanyDto {
  name: string,
  catchPhrase: string,
  bs: string
}

export interface UserDto {
  id: number,
  name: string,
  email: string,
  phone: string,
  username: string,
  website: string,

  address: UserAddressDto,
  company: UserCompanyDto,
}
