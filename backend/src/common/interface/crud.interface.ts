// most people refer to this as CRUD -- by I find CURD easier to explain to newbees
export interface CRUD {
  list: (limit:number,page:number) =>Promise<any>;
  create: (resource:any) => Promise<any>;
  putById: (id:string,resource:any) => Promise<string>;
  readById: (id: string) => Promise<any>;
  deleteById: (id:string) => Promise<string>;
  patchById: (id:string, resource:any) => Promise<string>;
}