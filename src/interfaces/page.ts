export interface page {title:string,href:string};
export type pages = page[]

export interface userData  {
        name: string,
        email: string,
        password: string,
        rePassword: string,
        dateOfBirth: string,
        gender: string,
      }
    
export interface userLogin{
    email:string,
    password:string
}

export interface comment{
 _id: string;
  content: string; 
  commentCreator: {
    _id: string; 
    name: string;
    photo: string; 
  };
  post: string; 
  createdAt: string; 

}